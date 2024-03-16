import { Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram";
import { UserCommand } from "./types";
import { defaultMenu } from "./wizards/command";

export default function (type?: string): InlineKeyboardMarkup {

    // include all the availabe commands here before starting
    const menu: UserCommand[] = [...defaultMenu];

    // if nothing is specified
    const fallBack: InlineKeyboardMarkup = {
        inline_keyboard: [[Markup.button.callback('↰Main Menu', 'clear')]]
    };

    // if type is not mentioned
    if (!type) {
        const primary = menu.find((m) => {
            return Object.keys(m).includes('primary');
        });

        if (primary) {
            const commandToSend: Array<Array<any>> = [];
            for (let i = 0; i < primary.primary.length; i += primary.row) {
                const parts = primary.primary.slice(i, i + primary.row);
                commandToSend.push(parts);
            }

            return {
                inline_keyboard: [...commandToSend.map((com) => com.map(([name, command]) => Markup.button.callback(name, command)))]
            };
        }
    }

    // if a type is given
    if (type) {
        const matched = menu.find((m) => {
            return Object.keys(m).includes(type as string);
        });
        if (!matched) return fallBack;

        if (matched) {
            const commandToSend: Array<Array<any>> = [];
            for (let i = 0; i < matched[type].length; i += matched.row) {
                const parts = matched[type].slice(i, i + matched.row);
                commandToSend.push(parts);
            }

            return {
                inline_keyboard: [...commandToSend.map((c) => c.map(([name, command]) => Markup.button.callback(name, command)))]
            };
        }
    }

    return fallBack;
}