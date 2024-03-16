import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import tg from './telegram/bot';
import { MyContext } from './telegram/types';

config();

let bot: Telegraf<MyContext> = tg();

function main(error: Boolean = false) {
    if (error) bot = tg();
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

process.on('exit', (message) => {
    console.log(`=> Exit, status code: ${message}`);
});

process.on('uncaughtException', function (error) {
    console.log(error.stack);
    bot.stop();
    main(true);
});

main();