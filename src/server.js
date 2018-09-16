const TelegramBot = require('node-telegram-bot-api');
const token = "677023252:AAGbnHDuAADY3nNjlYCAIwLj5ssb484lw28";
const bot = new TelegramBot(token, {polling: true});
const utils = require('./modules/utils/utils');

/*

Commands that work in groups

For User:-

/tip @user <amount> - tip a user with specified token amount
/upvote <amount> - reply to any message in your chat. Tips the creator with specified amount.

For Admin:-

/ban @user - ban a user from receiving tokens hence forth
/unban @user - unban a user from receiving tokens

Commands that work in DMs

For User:-
/balance - this will show your current balance
/redeem <amount> - to redeem tokens in exchange of bounty after specified date

For Admin:-

/set_cycle <days> - sets redemption cycle in number of days
/set_bounty <amount> - set bounty for the specified period
/set_daily_award <amount> - sets daily award to be given to users
/award @user <amount> - awards specified user additional tokens
/deduct @user <amount> - deduct tokens from specified user

*/

const SUPERGROUP_ID = '-1001241579924';
const ALLOWED_COMMANDS = {
  ADMIN: [
    '/ban', '/unban', '/set_cycle', '/set_bounty',
    '/set_daily_award', '/award', '/deduct'],
  USER: [
    '/tip', '/upvote', '/balance', '/redeem']
}

// :: Group based Commands ::

// For User

bot.onText(/\/start/, (message) => {
  // Setup the SUPERGROUP_ID
});

bot.onText(/\/help/, (message) => {
  // Render help menu
});

bot.on('message', (message) => {
    // console.log(message);
    bot.getChatAdministrators(SUPERGROUP_ID)
    .then((admins) => {
      // console.log(data);
      const user = extractUser(message, admins);
      console.log('Extracted User =>', user);
      const message_text = extractText(message);
      console.log(message_text);
      // const isPrivateChat = message.chat.type == "private" ? true : false;

      // executeCommand(mode, command_name, data)

    }).catch(console.log);
});

const extractUser = function(message, admins) {
  //console.log('Sent Message ->', message);
  //console.log('Admins for Supergroup ->', admins);
  var id = message.from.id; var username = message.from.username;
  // console.log(message.from.id);
  var is_admin = false;
  for(var i = 0; i < admins.length; i++) {
    // console.log(admins);
    var admin = admins[i].user;
    // console.log("Current Admin", admin);
    if(`${admin.id}` == `${id}`) {
      is_admin = true;
      break;
    }
  }
  var allowed_commands = is_admin ? ALLOWED_COMMANDS.ADMIN : ALLOWED_COMMANDS.USER;
  var user = { id, username, is_admin, allowed_commands};
  return user;
}

const extractText = function(message) {
  return message.text;
}

// executeCommand(mode, command_name, user) {
  // Check if command allowed or not by referring array, else respond kindly

  // if isPrivateChat {
    // executePrivateChatCommand(command, user)
  // } else {
    // executeGroupChatCommand(command, user)
 // }
// }

// executePrivateChatCommand()
// executeGroupChatCommand()
