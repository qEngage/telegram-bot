const {SUPERGROUP_ID, ESCROW_ACCOUNT, USER_ACCOUNTS, ALLOWED_COMMANDS} =
require('../constants/constants');

var GENERAL_CACHE = {
  restricted_users: []
}

var SYSTEM_CACHE = {
  bounty_amount: 500,
  daily_award: 20,
  cycle_period: 15,
  total_tokens: 100000
};

var USER_CACHE = {
  qEng_Admin: {
    address: "QLzLs1De53uRAA6QxQkBATvrAiLd6s86wg",
    spending_limit: 0,
    earned_tokens: 0,
    usd_balance: 0
  },
  qEng_UserOne:{
    address: "QLzLs1De53ul1b1xQkBATvrAiLd6s86wg",
    spending_limit: 0,
    earned_tokens: 0,
    usd_balance: 0
  },
  qEng_UserTwo:{
    address: "QLzLs1De53uRAA6PoLoBATvrAiLd6s86wg",
    spending_limit: 0,
    earned_tokens: 60,
    usd_balance: 7.5
  },
  qEng_GrowthBot:{
    address: "QLzLs1Dexx34AA6QxQkBATvrAiLd6s86wg",
    spending_limit: 0,
    earned_tokens: 0,
    usd_balance: 0
  }
}

var USER_CACHE_SUMMARY = [
  {username: "qEng_Admin", wallet_id: "QLzLs1De53uRAA6QxQkBATvrAiLd6s86wg" },
  {username: "qEng_UserOne", wallet_id: "QLzLs1De53ul1b1xQkBATvrAiLd6s86wg"},
  {username: "qEng_UserTwo", wallet_id: "QLzLs1De53uRAA6PoLoBATvrAiLd6s86wg"},
  {username: "qEng_GrowthBot", wallet_id: "QLzLs1Dexx34AA6QxQkBATvrAiLd6s86wg"}
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
  return GENERAL_CACHE = cache;
}

const writeToSystemCache = function(cache) {
  // Populate Cache from File system
  return SYSTEM_CACHE = cache;
}

const writeToUserCache = function(cache) {
  // Populate Cache from File system
  return USER_CACHE = cache;
}

module.exports = {
  readGeneralCache, readSystemCache, readUserCache, readUserCacheSummary,
  writeToGeneralCache, writeToSystemCache, writeToUserCache
}
