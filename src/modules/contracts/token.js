const {SUPERGROUP_ID, ESCROW_ACCOUNT, USER_ACCOUNTS, ALLOWED_COMMANDS} =
require('../constants/constants');
const Cache = require('../mem_files/mem_file');

const executeTipTransfer = function(transfer) {
  console.log("Executing tip transfer...");
  return executeTransfer(transfer);
}

const executeUpvoteTransfer = function(transfer) {
  console.log("Executing upvote transfer...");
  return executeTransfer(transfer);
}

const executeRedeemTransfer = function(transfer) {
  console.log("Executing redeem transfer...");
  return executeTransfer(transfer);
}

const executeTransfer = function(transfer) {
  console.log("\n");
  console.log(transfer);
  // MODIFY MEMFILE
  console.log("Just executed transfer!")
  return transfer;
}

const getBalance = function(address) {
  console.log("Showing balance of address ->", `${address}`);
  address = `${address}`;
  const userCache = Cache.readUserCache();
  for(const [key,val] of Object.entries(userCache)) {
    //console.log(key, val);
    const tokens = JSON.stringify(val.earned_tokens);
    const usd = JSON.stringify(val.usd_balance);
    console.log(`${val.address}`, address, tokens, usd);
    if (`${val.address}` == address) {
      return `Tokens: ${tokens}, USD: $${usd}`;
    }
  }
  return "User Not Found!";
}

module.exports = {
  executeTipTransfer,
  executeUpvoteTransfer,
  executeRedeemTransfer,
  getBalance
}
