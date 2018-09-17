const {SUPERGROUP_ID, ESCROW_ACCOUNT, USER_ACCOUNTS, ALLOWED_COMMANDS} =
require('../constants/constants');
const {ADMIN_CACHE, USER_CACHE} =
require('../mem_files/mem_file');

const executeTransfer = function(transfer) {
  console.log("Just executed transfer request below...")
  console.log(transfer);
  return transfer;
}

const showBalance = function(address) {
  console.log("Showing balance of address ->", address);
  return address;
}

module.exports = {
  executeTransfer,
  showBalance
}
