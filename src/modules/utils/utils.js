const {SUPERGROUP_ID, ESCROW_ACCOUNT, ALLOWED_COMMANDS} =
require('../constants/constants');
const Cache = require('../mem_files/mem_file');

const getFormattedTimeStamp = function(timeSince1970) {
  var date = new Date(timeSince1970);
  const dateString = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
  const timeString = `${date.getHours()}:${date.getMinutes()}`;
  return `${dateString} ${timeString}`;
}

const getWalletFromUsername = function(username){

  const userCache = Cache.readUserCache();
  const USER_ACCOUNTS = userCache.readUserCacheSummary();

  username = `${username}`;
  username = username.substring(1,username.length);

  var walletAddress = "default";
  for(var i = 0; i < USER_ACCOUNTS.length; i++) {
    // console.log(USER_ACCOUNTS[i]);
    // console.log(username);
    if(USER_ACCOUNTS[i].username == username){
      walletAddress = USER_ACCOUNTS[i].wallet_id;
    }
  }
  return walletAddress;
}

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

const logJSON = function(obj) {
  console.log(JSON.stringify(obj, undefined, 2));
}


module.exports = {
  getFormattedTimeStamp,
  getWalletFromUsername,
  extractUser,
  extractCommand,
  logJSON
}
