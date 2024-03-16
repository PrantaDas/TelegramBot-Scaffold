import EventEmitter from "events";
import { Scenes, Telegraf, session } from "telegraf";
import connectToMongoDB from "../db/mongodb";
import actions from "./actions";
import eventManager from "./eventManager";
import menu from "./menu";
import { StoreManagement } from "./store";
import { Command, ContextType, MyContext } from "./types";
import { antispamMiddleware } from "./middlewares";

const scenes: any[] = [
    // scenes goes here
];

export default function tg() {
    const emitter = new EventEmitter();
    const store = new StoreManagement(emitter);

    eventManager(emitter);

    // Throw store errors
    emitter.on('store_error', (message: any) => { throw new Error(message) });

    // pass required command list here
    const myCommands: Command[] = [];

    const { BOT_TOKEN } = process.env;

    // chekcing for bot token
    if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is missing!');

    // initialized the bot
    const bot = new Telegraf<MyContext>(BOT_TOKEN);

    // include all the addtional wizards here as needed
    const stage = new Scenes.Stage<MyContext>(scenes.map(s => s(emitter, store)));

    // handling sessions
    bot.use(session());

    // antispan middleware
    bot.use(antispamMiddleware);

    // using the custom scenes through middleware
    bot.use(stage.middleware());

    actions(bot, store, emitter);

    // setting the bot commands
    bot.telegram.setMyCommands(myCommands);

    // 
    bot.use(async (ctx: ContextType, next) => {
        console.log(ctx);
        // include additional info regarding  user here
        return next();
    });

    // setting a time to track the action
    bot.use((ctx, next) => {
        ctx.triggerAt = new Date();
        return next();
    });

    const main = () => {

        // start the bot
        bot.start((ctx) => {
            const { from } = ctx.update.message;
            store.addItem(from.id.toString(), { user: from });
            ctx.replyWithHTML('<b>Available Options</b>', {
                reply_markup: menu()
            })
            // perform startup functionality here
        });

        // help commands goes here
        bot.help((ctx) => {
            console.log(ctx);
            // handle help functionality here
        });

        // listen for specific message
        bot.hears(/.*/, (ctx) => {
            // console.log(ctx);
        });

        bot.launch();

        // checking the bot is started or not
        console.log('=> Bot started...');

    };

    try {
        connectToMongoDB()
            .then((msg) => {
                console.log(msg);
                main();
            })
            .catch(err => console.log(err));
    }
    catch (err: any) {
        console.log(err);
    }

    return bot;
}