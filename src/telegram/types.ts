import { Context, Scenes } from "telegraf";

export interface ContextType extends Context {
    user?: User;
};

export type Messages = {
    text?: string;
    messageId: number;
    command?: string;
    callback_query?: string;
};

export type User = {
    userId: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    chats?: Messages[];
};

export type UserData = {
    [key: string]: User;
};

export type Command = {
    command: string;
    description: string;
};

export type UserCommand = {
    [key: string]: any;
    rem: Array<Array<string>>;
    row: 1 | 2 | 3
};

export interface UserTempData {
    [userId: string]: any;
}

export type Actions = {
    action: string;
    name?: string;
    remAction?: string;
    sceneName?: string;
    enterScene: boolean;
    entry?: (ctx: MyContext) => void;
    callback: (ctx: MyContext, userData?: UserData) => Promise<any | string>;
};

export interface MyContext extends Context {
    // will be available under `ctx.tirggerAt`
    triggerAt: Date;
    // declare scene type
    scene: Scenes.SceneContextScene<MyContext, Scenes.WizardSessionData>;
    // declare wizard type
    wizard: Scenes.WizardContextWizard<MyContext>;
    update: any;
    tempData: UserTempData;
}


export type BlackListconfig = {
    gasLimitMin?: number;
    gasLimitMul?: number;
    gasGweiMin?: number;
    gasGweiMul?: number;
    maxFeePerGas?: number;
    percentIn?: number[];
};