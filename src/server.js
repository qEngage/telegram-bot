/*

Commands that work in groups

For User:-

/tip @user <amount> - tip a user with specified token amount
/upvote <amount> - reply to any message in your chat. Tips the creator with specified amount.

For Admin:-

/restrict @user - restrict a user from receiving tokens hence forth
/unrestrict @user - unrestrict a user from receiving tokens

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


const {CONTRACTS} = require('./contracts/config');
const {SUPERGROUP_ID, ESCROW_ACCOUNT, USER_ACCOUNTS, ALLOWED_COMMANDS} =
require('./modules/constants/constants');

const TelegramBot = require('node-telegram-bot-api');
const token = "677023252:AAGbnHDuAADY3nNjlYCAIwLj5ssb484lw28";
const bot = new TelegramBot(token, {polling: true});
const Utils = require('./modules/utils/utils');

const TokenContract = require('./modules/contracts/token');
const UserContract = require('./modules/contracts/user');


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
      const user = Utils.extractUser(message, admins);
      // console.log('Extracted User =>', user);
      const command = Utils.extractCommand(message);
      // console.log(command);
      const context = message.chat.type == "private" ? "private" : "group";
      // console.log(context);
      processCommand(message, command, context, user);
    }).catch(console.log);
});



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
      const address = Utils.getWalletFromUsername(`@${user.username}`);
      // console.log(address);
      var response = "Here's your wallet details...\n";
      response += `Address: ${address}\n`;
      // Enquire BalanceOf (balanceOf(address))
      response += `Balance: ${TokenContract.showBalance(address)}\n`;
      console.log(response);
      bot.sendMessage(user.id, response);
      return;
    }
    if(command.startsWith("/redeem")){
      console.log("Executing redemption for user...");
      const address = Utils.getWalletFromUsername(`@${user.username}`);
      const amount = command.split(" ")[1];
      const from_address = ESCROW_ACCOUNT;
      var transfer = {
        from_user: from_address,
        to_user: address ,
        amount: amount
      };
      // Utils.logJSON(transfer);
      // Execute Redeem (transfer from qEng_GrowthBot to address)
      TokenContract.executeTransfer(transfer);
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
      from_user: Utils.getWalletFromUsername(`@${user.username}`),
      to_user: {} ,
      amount: 0
    };

    if(command.startsWith("/tip")) {
      // Command Format :- /tip @user <amount>
      console.log("Executing tip transaction from user...");
      transfer.to_user = Utils.getWalletFromUsername(command.split(" ")[1]);
      transfer.amount = command.split(" ")[2];
      // Utils.logJSON(transfer);
      // Make Transfer via Smart Contract (transfer(from, to, amt))
      TokenContract.executeTransfer(transfer);
      return;
    }
    if(command.startsWith("/upvote")) {
      // Command Format :- /upvote <amount> [Note: Upvote should be in response to a message]
      console.log("Executing upvote transaction from user...");
      transfer.to_user = Utils.getWalletFromUsername(
        message.reply_to_message.from.username);
      transfer.amount = command.split(" ")[1];
      // Utils.logJSON(transfer);
      // Make Transfer via fransfer(transfer);
      TokenContract.executeTransfer(transfer);
      return;
    }
  } else {
    if(command.startsWith("/restrict")) {
      // Command Format :- /restrict @username
      console.log("restrictning user from receiving tokens...");

      return;
    }
    if(command.startsWith("/unrestrict")) {
      // Command Format :- /unrestrict @username
      console.log("Unrestrictning user from receiving tokens...");

      return;
    }
  }
}
