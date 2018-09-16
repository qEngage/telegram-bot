const {CONTRACTS} = require('./contracts/config');

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
      // console.log('Extracted User =>', user);
      const command = extractCommand(message);
      // console.log(command);
      const context = message.chat.type == "private" ? "private" : "group";
      // console.log(context);
      processCommand(command, context, user);
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

const extractCommand = function(message) {
  // TODO:- Process Later if necessary
  return message.text;
}

const processCommand = function(command, context, user) {
  // console.log("Command Issued =>", command);
  // console.log("Issued in context =>", context);
  // console.log("For User \n", user);
  const user_auth= user.is_admin ? "admin" : "non_admin";
  if(context == "private") {
    // TODO:- Check for Validity, else kindly respond
    // Validity includes valid text command, valid arguments as well
    executeCommandInPrivate(command, user_auth, user);
  } else {
    // TODO:- Check for Validity, else return kind response
    // Validity includes valid text command, valid arguments as well
    executeCommandInGroup(command, user_auth, user);
  }
  // console.log("Token Contract =>", CONTRACTS.TOKEN);
}



const executeCommandInPrivate = function(command, auth, user) {
  console.log("Executing Command Issued in DM...");
  console.log("| Command |", command);
  console.log("| User Auth |", auth);
  console.log("| User |", user);
}

const executeCommandInGroup = function(command, auth, user) {
  console.log("Executing Command Issued in Group...");
  console.log("| Command |", command);
  console.log("| User Auth |", auth);
  console.log("| User |", user);
}

// executePrivateChatCommand()
// executeGroupChatCommand()
