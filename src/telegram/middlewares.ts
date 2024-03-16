import { MyContext, UserTempData } from "./types";

const DATA: UserTempData = {};

// anti-flood middleware for restrict continious messagge in a short time period
export async function antispamMiddleware(ctx: MyContext, next: () => Promise<void>): Promise<void> {
    const { message } = ctx;
    if (message && message.from) {
        const userId = message.from.id.toString();
        ctx.tempData = { [userId]: 'OK' };
        if (DATA[userId]) {
            if (typeof DATA[userId] === 'number' && Date.now() - DATA[userId] < 2000) {
                ctx.tempData = { [userId]: 'FAIL' };
                await ctx.reply('You are making requests too often 🤨');
            }
        }
        DATA[userId] = Date.now();
    }
    return next();
}

// declare additional middleware here