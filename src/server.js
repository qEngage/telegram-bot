const TelegramBot = require('node-telegram-bot-api');
const token = "677023252:AAGbnHDuAADY3nNjlYCAIwLj5ssb484lw28";
const bot = new TelegramBot(token, {polling: true});
const utils = require('./modules/utils/utils');

/*

Commands that work in groups

/tip @user <amount> - tip a user with specified token amount
/upvote <amount> - reply to any message in your chat. Tips the creator with specified amount.

Commands that work in DMs

For User:-
/balance - this will show your current balance
/redeem <amount> - to redeem tokens in exchange of bounty after specified date

For Admin:-

/ban @user - ban a user from receiving tokens hence forth
/unban @user - unban a user from receiving tokens
/set_cycle <days> - sets redemption cycle in number of days
/set_bounty <amount> - set bounty for the specified period
/set_daily_award <amount> - sets daily award to be given to users
/award @user <amount> - awards specified user additional tokens
/deduct @user <amount> - deduct tokens from specified user

*/

var supergroupId = '-1001241579924';

// :: Group based Commands ::

// For User

bot.onText(/\/start/, (message) => {
  // Setup the supergroupId
});

bot.onText(/\/help/, (message) => {
  // Render help menu
});

bot.on('message', (message) => {
    // console.log(message);
    bot.getChatAdministrators(supergroupId)
    .then((admins) => {
      // console.log(data);
      const user = extractUser(message, admins);
      // const user = extractUser(data); <-- Set properties like isAdmin, allowedCommands
      // user's name, user's unique Id, isHeAdmin, listOfAllowedCommands


      // const isPrivateChat = message.chat.type == "private" ? true : false;

      // executeCommand(mode, command_name, data)

    }).catch(console.log);
});

const extractUser = function(message, admins) {
  console.log('Sent Message ->', message);
  console.log('Admins for Supergroup ->', admins);

}

// extractUser(user) {
  // const isUserAdmin = check if user is amongst admins passed
  // const allowedCommands = getAllowedCommands(user);
//}

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
