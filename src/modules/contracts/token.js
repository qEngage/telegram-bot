const {SUPERGROUP_ID, ESCROW_ACCOUNT, USER_ACCOUNTS, ALLOWED_COMMANDS} =
require('../constants/constants');
const {GENERAL_CACHE, SYSTEM_CACHE, USER_CACHE} =
require('../mem_files/mem_file');

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

const showBalance = function(address) {
  console.log("Showing balance of address ->", address);
  // READ MEMFILE
  return address;
}

module.exports = {
  executeTransfer,
  showBalance
}
