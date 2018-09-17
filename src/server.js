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
const {SUPERGROUP_ID, ESCROW_ACCOUNT, ALLOWED_COMMANDS} =
require('./modules/constants/constants');
const Cache = require('./modules/mem_files/mem_file');

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
      response += `<b> Address: </b> ${address}\n`;
      // Enquire BalanceOf (balanceOf(address))
      response += `<b> Balance: </b> ${TokenContract.getBalance(address)}\n`;
      console.log(response);
      bot.sendMessage(user.id, response, {parse_mode: "HTML"});
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
      TokenContract.executeRedeemTransfer(transfer);
      var response = "I just redeemed tokens for you. Check your new balance!"
      bot.sendMessage(user.id, response, {parse_mode: "HTML"});
      return;
    }
  } else { // auth is admin

    if(command.startsWith("/info")) {
      const USER_ACCOUNTS = Cache.readUserCacheSummary();
      const second_arg = command.split(' ')[1];
      if(second_arg == "accounts") {
        var response = "<i> Here's a summary list of all user accounts in your supergroup </i>\n ";
        // response += JSON.stringify(USER_ACCOUNTS, undefined, 2);
        for(var i = 0;i < USER_ACCOUNTS.length; i++) {
          var account = USER_ACCOUNTS[i];
          var username = account.username;
          var address = account.wallet_id;
          var balance = TokenContract.getBalance(address);
          response += "=========================================================\n";
          response += `<b> Username: </b>${username}\n`;
          response += `<b> Address: </b>${address}\n`;
          response += "=========================================================\n";
        }
        console.log(response);
        bot.sendMessage(user.id, response, {parse_mode: "HTML"});
        return;
      }

      if(second_arg == "system") {
        var response = "<i> Here's the current setup for your supergroup </i>\n";
        response += "=========================================================\n";
        response += `<b>GROUP ID: </b>${SUPERGROUP_ID}\n`;
        response += `<b>REDEMPTION CYCLE: </b>${UserContract.getCycleForGroup(SUPERGROUP_ID)} days\n`;
        response += `<b>BOUNTY REWARD FOR CYCLE: </b>$${UserContract.getBountyForGroup(SUPERGROUP_ID)} USD\n`;
        response += `<b>DAILY TOKEN DISTRIBUTION PER USER: </b>${UserContract.getDailyRewardForGroup(SUPERGROUP_ID)} tokens\n`;
        response += `<b>TOTAL TOKENS FOR DISTRIBUTION: </b> ${UserContract.getTotalTokensForGroup(SUPERGROUP_ID)} tokens\n`
        response += "=========================================================\n";
        console.log(response);
        bot.sendMessage(user.id, response, {parse_mode: "HTML"});
        return;
      }

      var username; var address; var balance;
      for(var i = 0;i < USER_ACCOUNTS.length; i++) {
        var account = USER_ACCOUNTS[i];
        if(account.username == second_arg) {
          username = account.username;
          address = account.wallet_id;
          balance = TokenContract.getBalance(address);
          break;
        }
      }

      var response = "=========================================================\n";
      response += `<b>Username: </b>${username}\n`;
      response += `<b>Address: </b>${address}\n`;
      response += `<b>Balance: </b>${balance}\n`;
      response += "=========================================================\n";
      console.log(response);
      bot.sendMessage(user.id, response, {parse_mode: "HTML"});
      return;
    }


    if(command.startsWith("/award")) {
      // Format:- /award @username <tokens>
      const username = command.split(" ")[1];
      const token = command.split(" ")[2];
      var response = (`Awarding <b>${username}</b> with <b>${token}</b> tokens...\n`);
      response += (`...\n`); response += (`...\n`);
      UserContract.awardToUser(
        Utils.getWalletFromUsername(`@${username}`), token);
      response += (`<b>${token}</b> tokens awarded to <b>${username}</b>!\n`);
      bot.sendMessage(user.id, response, {parse_mode: "HTML"});
      return;
    }


    if(command.startsWith("/deduct")) {
      // Format:- /deduct @username <tokens>
      const username = command.split(" ")[1];
      const token = command.split(" ")[2];
      var response = (`Deducting <b>${token}</b> tokens from  <b>${username}</b>...\n`);
      response += (`...\n`); response += (`...\n`);
      UserContract.deductFromUser(
        Utils.getWalletFromUsername(`@${username}`), token);
      response += (`Deducted <b>${token}</b> tokens from <b>${username}</b>!\n`);
      bot.sendMessage(user.id, response, {parse_mode: "HTML"});
      return;
    }


    if(command.startsWith("/set_cycle")) {
      const days = command.split(" ")[1];
      var response = (`Setting cycle for bounty distribution to <b>${days}</b> days...\n`);
      response += (`...\n`); response += (`...\n`);
      UserContract.setCycleForGroup(SUPERGROUP_ID);
      response += (`Set the cycle successfully!\n`);
      bot.sendMessage(user.id, response, {parse_mode: "HTML"});
      return;
    }


    if(command.startsWith("/set_bounty")) {
      const amount = command.split(" ")[1];
      var response = (`Setting bounty for bounty distribution to <b>$${amount} USD</b>...\n`);
      response += (`...\n`); response += (`...\n`);
      UserContract.setBountyForGroup(SUPERGROUP_ID);
      response += (`Set the bounty successfully!\n`);
      bot.sendMessage(user.id, response, {parse_mode: "HTML"});
      return;
    }


    if(command.startsWith("/set_daily_award")) {
      const reward = command.split(" ")[1];
      var response = (`Setting daily reward for each user to <b>${reward}</b> tokens...\n`);
      response += (`...\n`); response += (`...\n`);
      UserContract.setDailyRewardForGroup(SUPERGROUP_ID);
      response += (`Set the new daily reward successfully!\n`);
      bot.sendMessage(user.id, response, {parse_mode: "HTML"});
      return;
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
      TokenContract.executeTipTransfer(transfer);
      bot.sendMessage(
        message.chat.id, `<b>${user.username} </b>just tipped and gave
        <b>${command.split(" ")[1]}</b> <b>${transfer.amount}</b> tokens!`, {parse_mode: "HTML"})
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
      TokenContract.executeUpvoteTransfer(transfer);
      bot.sendMessage(
        message.chat.id, `<b>${user.username}</b> just upvoted and gave
        <b>${message.reply_to_message.from.username}</b> <b>${transfer.amount}</b> tokens!`, {parse_mode: "HTML"});
      return;
    }

  } else {

    if(command.startsWith("/restrict")) {
      // Command Format :- /restrict @username
      console.log(`Restricting ${user.username} from receiving tokens...`);
      UserContract.restrictUser(
        Utils.getWalletFromUsername(command.split(" ")[1]));
      console.log(
        `Admin has restricted ${user.username} from receiving tokens`);
      bot.sendMessage(
        message.chat.id,
        `Admin has restricted <b>${user.username}</b> from receiving tokens`,
        {parse_mode: "HTML"});
      return;
    }

    if(command.startsWith("/unrestrict")) {
      // Command Format :- /unrestrict @username
      console.log(`Restricting ${user.username} from receiving tokens...`);
      UserContract.restrictUser(
        Utils.getWalletFromUsername(command.split(" ")[1]));
      console.log(`Admin has un-restricted ${user.username} from receiving tokens`);
      bot.sendMessage(
        message.chat.id,
        `Admin has un-restricted <b>${user.username}</b> from receiving tokens`,
        {parse_mode: "HTML"});
      return;
    }

  }
}
