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

/info - gives info on all user account username and wallet ids in supergroup
/set_cycle <days> - sets redemption cycle in number of days
/set_bounty <amount> - set bounty for the specified period
/set_daily_award <amount> - sets daily award to be given to users
/award @user <amount> - awards specified user additional tokens
/deduct @user <amount> - deduct tokens from specified user
*/

const SUPERGROUP_ID = '-1001241579924';
const USER_ACCOUNTS = [
  {username: "qEng_Admin", wallet_id: "0x41bd2699334286eb8ab0d638ec06b21a4d104c9e" },
  {username: "qEng_UserOne", wallet_id: "0x6884194ff603ddb44dabfdd03401cd09739aa19b"},
  {username: "qEng_UserTwo", wallet_id: "0x4c159ad5b15a3b2faec13c2214f37db8732bb41b"},
  {username: "qEng_GrowthBot", wallet_id: "0xf70d09b4240216741c0316ec2d5c61556f57987e"}
];

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
  // Setup Wallet IDS and Username mappings for All Users in SUPERGROUP_ID

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
      processCommand(message, command, context, user);
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

const processCommand = function(message, command, context, user) {
  // console.log("Command Issued =>", command);
  // console.log("Issued in context =>", context);
  // console.log("For User \n", user);
  const user_auth= user.is_admin ? "admin" : "user";
  if(context == "private") {
    // TODO:- Check for Validity, else kindly respond
    // Validity includes valid text command, valid arguments as well
    executeCommandInPrivate(message, command, user_auth, user);
  } else {
    // TODO:- Check for Validity, else return kind response
    // Validity includes valid text command, valid arguments as well
    executeCommandInGroup(message, command, user_auth, user);
  }
  // console.log("Token Contract =>", CONTRACTS.TOKEN);
}



const executeCommandInPrivate = function(message, command, auth, user) {
  // console.log("Executing Command Issued in DM...");
  // console.log("| Command |", command);
  // console.log("| User Auth |", auth);
  // console.log("| User |", user);
  if(auth == "user") {
    // TODO:- Modularize
    if(command.startsWith("/balance")) {
      console.log("Executing balance enquiry for user...");
      return;
    }
    if(command.startsWith("/redeem")){
      console.log("Executing redemption for user...");
      return;
    }
  } else { // auth is admin
    if(command.startsWith("/info")) {
      var response = "Here's a list of all user accounts in your supergroup\n ";
      response += JSON.stringify(USER_ACCOUNTS, undefined, 2);
      console.log(response);
      bot.sendMessage(user.id, response);
    }
  }
}

const executeCommandInGroup = function(message, command, auth, user) {
  // console.log("Executing Command Issued in Group...");
   console.log("| Command |", command);
  // console.log("| User Auth |", auth);
  // console.log("| User |", user);
  if(auth == "user") {
    // TODO:- Modularize
    var transfer = {
      from_user: getWalletFromUsername(`@${user.username}`),
      to_user: {} ,
      amount: 0
    };

    if(command.startsWith("/tip")) {
      // Command Format :- /tip @user <amount>
      console.log("Executing tip transaction from user...");
      transfer.to_user = getWalletFromUsername(command.split(" ")[1]);
      transfer.amount = command.split(" ")[2];
      logJSON(transfer);
      // Make Transfer via Smart Contract

      return;
    }
    if(command.startsWith("/upvote")) {
      // Command Format :- /upvote <amount> [Note: Upvote should be in response to a message]
      console.log("Executing upvote transaction from user...");
      transfer.to_user = getWalletFromUsername(
        message.reply_to_message.from.username);
      transfer.amount = command.split(" ")[1];
      logJSON(transfer);
      // Make Transfer via Smart Contract
      return;
    }
  } else {

  }
}


const getWalletFromUsername = function(username){
  username = `${username}`;
  username = username.substring(1,username.length);

  var walletAddress = "default";
  for(var i = 0; i < USER_ACCOUNTS.length; i++) {
    console.log(USER_ACCOUNTS[i]);
    console.log(username);
    if(USER_ACCOUNTS[i].username == username){
      walletAddress = USER_ACCOUNTS[i].wallet_id;
    }
  }
  return walletAddress;
}

const logJSON = function(obj) {
  console.log(JSON.stringify(obj, undefined, 2));
}
// executePrivateChatCommand()
// executeGroupChatCommand()
