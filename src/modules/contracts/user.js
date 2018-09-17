const {SUPERGROUP_ID, ESCROW_ACCOUNT, USER_ACCOUNTS, ALLOWED_COMMANDS} =
require('../constants/constants');
const Cache = require('../mem_files/mem_file');

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

//
// var SYSTEM_CACHE = {
//   bounty_amount: 0,
//   daily_award: 0,
//   cycle_period: 0
// };

const getCycleForGroup = function(groupId) {
  const systemCache = Cache.readSystemCache();
  return systemCache.cycle_period;
}

const getBountyForGroup = function(groupId) {
  const systemCache = Cache.readSystemCache();
  return systemCache.bounty_amount;
}

const getDailyRewardForGroup = function(groupId) {
  const systemCache = Cache.readSystemCache();
  return systemCache.daily_award;
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
