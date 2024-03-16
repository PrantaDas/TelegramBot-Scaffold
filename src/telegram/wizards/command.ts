import { UserCommand } from "../types";


// all the commands(buttons with call_back_query) that needs to handle will put here
export const defaultMenu: UserCommand[] = [
    {
        primary: [
            ['Hello There', 'hello'],
            ['Welcome', 'welcome'],
        ],
        rem: [],
        row: 3
    }
];