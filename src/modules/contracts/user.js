const {SUPERGROUP_ID, ESCROW_ACCOUNT, USER_ACCOUNTS, ALLOWED_COMMANDS} =
require('../constants/constants');
const {GENERAL_CACHE, SYSTEM_CACHE, USER_CACHE} =
require('../mem_files/mem_file');

const restrictUser = function(username, address) {
  console.log(address);
  // MODify MEMFILE
  return address;
}

const unrestrictUser = function(address) {
  console.log(address);
  // MODify MEMFILE
  return address;
}

const awardToUser = function(address, amount) {
  // MODify MEMFILE
}

const deductFromUser = function(address, amount) {
  // MODify MEMFILE
}

const setCycleForGroup = function(groupId) {
// MODify MEMFILE
}

const setBountyForGroup = function(groupId) {
// MODify MEMFILE
}

const setDailyRewardForGroup = function(groupId) {
// MODify MEMFILE
}

const getCycleForGroup = function(groupId) {
// READ MEMFILE
  return "Cycle";
}

const getBountyForGroup = function(groupId) {
// READ MEMFILE
  return "Cycle";
}

const getDailyRewardForGroup = function(groupId) {
// READ MEMFILE
  return "Cycle";
}

module.exports = {
  restrictUser,
  unrestrictUser,
  awardToUser,
  deductFromUser,
  setCycleForGroup,
  setBountyForGroup,
  setDailyRewardForGroup,
  getCycleForGroup,
  getBountyForGroup,
  getDailyRewardForGroup
}
