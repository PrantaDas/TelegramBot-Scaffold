<h1>Telegram Bot Scaffold 🐳</h1>

```typescript
A template for a telegram bot build on top of Telegraf.Js.
.
├── config
|    ├── dev.env
|    └── prod.env
├── src
|   ├── telegram
|   |   ├── wizards
|   |   |   ├── command.ts
|   |   |   └── demo.wizard.ts
|   |   ├── actions.ts
|   |   ├── bot.ts
|   |   ├── menu.ts
|   |   ├── types.ts
|   |   └── utils.ts
|   └── index.ts
|
├── .gitignore
├── Feedbacks.md
├── License
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock

```

Enviroment Variables

`BOT_TOKEN = 'your_bot_token'`</br>
`MODE = 'dev'`

## Installation

Clone the project
```shell
$ git clone https://github.com/PrantaDas/TelegramBot-Scaffold.git
```
Go to the project directory

```shell
$ cd TelegramBot-Scaffold
```

Install dependencies
```shell
$ yarn or npm install or pnpm install
```

Start the bot
```shell
$ yarn start-dev or npm run start-dev or pnpm start-dev
```

Usage/Examples:



Include all the markup menus that will appear on telegram
```javascript
export default function (type?: string): InlineKeyboardMarkup {

    // include all the availabe commands here before starting
    const menu: UserCommand[] = [...defaultMenu];

}
```


Include the bot actions inside the `action` function.

```javascript
export default function actions(bot: Telegraf<MyContext>, userData?: UserData) {
    // include all the bot actions here
    const botActions: Actions[] = [
        {
            action: 'sniperBot',
            name: 'Buy or Sell',
            sceneName: 'buy-sell',
            enterScene: true,
            callback: async () => console.log('entered the scene')
        }
    ];

}
```

Create custom scene

```javascript
import { Scenes } from "telegraf";
import { message } from 'telegraf/filters';
import menu from "../menu";

const defaultWizard = new Scenes.WizardScene(
    "default-wizard",
    async (ctx) => {
        await ctx.replyWithHTML(
            '<b>Available Options</b>', {
            reply_markup: menu()
        }
        );
    },
    async (ctx) => {
        console.log(ctx);
        await ctx.scene.leave();
    },
);

defaultWizard.on(message('text'), async (ctx) => {
    console.log(ctx);
});

export default defaultWizard;
```

Then include the wizard to the state middleware

```javascript
const stage = new Scenes.Stage<MyContext>([buyWizard,other_middleware]);
```


Set the bot commands in `bot.ts` file before starting

```javascript
const myCommands: Command[] = [your_commands];

// setting the bot commands
bot.telegram.setMyCommands(myCommands);
```

> Under Development  📝.