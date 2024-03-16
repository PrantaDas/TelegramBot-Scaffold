import { Markup } from "telegraf";

// default buttons that will be used or not depending on the features

export const DEFAULT_BUTTONS = [
  Markup.button.callback('📱 Main menu', 'menu'),
  Markup.button.callback('❌ Cancel', 'cancel'),
];

export const DEFAULT_ACTION_COMMANDS = [
  ['📱 Main menu', 'primary'],
  ['❌ Cancel', 'cancel'],
];