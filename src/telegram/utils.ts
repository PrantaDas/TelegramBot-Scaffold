import { Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram";

//  utility functions
export function fallBackMenu(data: Array<Array<any>>): InlineKeyboardMarkup {
    return {
        inline_keyboard: [
            ...data.map((d) => d.map(([name, command]) => Markup.button.callback(name, command))),
            [Markup.button.callback('Exit', 'leaveStage')],
            [Markup.button.callback('Main Menu', 'leaveStage')]
        ],
    }
}

// custom error class for error handling while taking inputs

export class InputError extends Error {
    constructor(message: string) {
        super(message);
    }
}
