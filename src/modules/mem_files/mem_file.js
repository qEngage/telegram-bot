const {SUPERGROUP_ID, ESCROW_ACCOUNT, USER_ACCOUNTS, ALLOWED_COMMANDS} =
require('../constants/constants');

var GENERAL_CACHE = {
  restricted_users: []
}

var SYSTEM_CACHE = {
  bounty_amount: 0,
  daily_award: 0,
  cycle_period: 0
};

var USER_CACHE = {
  qEng_Admin: {
    address: "0x41bd2699334286eb8ab0d638ec06b21a4d104c9e",
    spending_limit: 0,
    earned_tokens: 0,
    usd_balance: 0
  },
  qEng_UserOne:{
    address: "0x6884194ff603ddb44dabfdd03401cd09739aa19b",
    spending_limit: 0,
    earned_tokens: 0,
    usd_balance: 0
  },
  qEng_UserTwo:{
    address: "0x4c159ad5b15a3b2faec13c2214f37db8732bb41b",
    spending_limit: 0,
    earned_tokens: 0,
    usd_balance: 0
  },
  qEng_GrowthBot:{
    address: "0xf70d09b4240216741c0316ec2d5c61556f57987e",
    spending_limit: 0,
    earned_tokens: 0,
    usd_balance: 0
  }
}

var USER_CACHE_SUMMARY = [
  {username: "qEng_Admin", wallet_id: "0x41bd2699334286eb8ab0d638ec06b21a4d104c9e" },
  {username: "qEng_UserOne", wallet_id: "0x6884194ff603ddb44dabfdd03401cd09739aa19b"},
  {username: "qEng_UserTwo", wallet_id: "0x4c159ad5b15a3b2faec13c2214f37db8732bb41b"},
  {username: "qEng_GrowthBot", wallet_id: "0xf70d09b4240216741c0316ec2d5c61556f57987e"}
];

const readGeneralCache = function() {
  // Populate Cache from File system
  return GENERAL_CACHE;
}

const readSystemCache = function() {
  // Populate Cache from File system
  return SYSTEM_CACHE;
}

const readUserCache = function() {
  // Populate Cache from File system
  return USER_CACHE;
}

const readUserCacheSummary = function() {
  // Populate Cache from File system
  return USER_CACHE_SUMMARY;
}

const writeToGeneralCache = function(cache) {
  // Populate Cache from File system
  return GENERAL_CACHE;
}

const writeToSystemCache = function(cache) {
  // Populate Cache from File system
  return SYSTEM_CACHE;
}

const writeToUserCache = function(cache) {
  // Populate Cache from File system
  return USER_CACHE;
}

module.exports = {
  readGeneralCache, readSystemCache, readUserCache, readUserCacheSummary,
  writeToGeneralCache, writeToSystemCache, writeToUserCache
}
