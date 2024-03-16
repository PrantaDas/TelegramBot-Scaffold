import EventEmitter from "events";
import { Markup, Telegraf } from "telegraf";
import menu from "./menu";
import { StoreManagement } from "./store";
import { Actions, MyContext, UserData } from "./types";

export default function actions(bot: Telegraf<MyContext>, store?: StoreManagement, emitter?: EventEmitter, userData?: UserData) {
    // include all the bot actions here
    const botActions: Actions[] = [
        {
            action: 'primary',
            name: 'Main menu',
            enterScene: false,
            entry: (ctx) => { },
            callback: async () => menu('primary')
        }
    ];

    // registering all the actionsf
    botActions.forEach((action) => {
        if (action.remAction) {
            bot.action(action.remAction, async (ctx) => {
                const { from } = ctx.update.callback_query;
                if (from.is_bot) return;
                // perform additional here operations if needed
                await ctx.replyWithHTML("<b>Available Options</b>", {
                    reply_markup: menu('primary')
                });
            });
        }


        // regular actions based on callback_query
        bot.action(action.action, async (ctx) => {
            const { from } = ctx.update.callback_query;
            if (from.is_bot) return;
            if (action.entry) action.entry(ctx);
            // if to enter a scene
            if (action.enterScene) {
                const replyMessage = await action.callback(ctx);
                // if the reply is plain striig
                if (typeof replyMessage === 'string') await ctx.replyWithHTML(replyMessage, {
                    parse_mode: 'HTML',
                    ...Markup.button.callback('↰Main Menu', 'clear')
                });
                // if reply is markup
                else await ctx.replyWithHTML(action.name!, {
                    parse_mode: 'HTML',
                    reply_markup: replyMessage
                });
                // entering the scene
                await ctx.scene.enter(action.sceneName!);
            }
            // handle regular actions
            else {
                const replyMessage = await action.callback(ctx);
                if (typeof replyMessage === 'string') await ctx.replyWithHTML(replyMessage, {
                    parse_mode: 'HTML',
                    ...Markup.button.callback('↰Main Menu', 'clear')
                });
                else await ctx.replyWithHTML(action.name!, {
                    parse_mode: 'HTML',
                    reply_markup: replyMessage
                })
            }
        });
    });



    // clear all the previous actions
    bot.action("leaveStage", async (ctx) => {
        const { from } = ctx.update.callback_query;
        if (from.is_bot) return;
        // exiting from all the scenes
        const scenes = botActions.filter((a) => a.enterScene && a.sceneName).map(({ sceneName }) => sceneName);
        scenes.forEach(async (scene) => {
            await ctx.scene.leave();
        });
        // perform additional operations here
        await ctx.replyWithHTML("<b>Available Options</b>", {
            reply_markup: menu('primary')
        });
    });

}