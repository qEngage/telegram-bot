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
    spending_limit: 0,
    earned_tokens: 0,
    usd_balance: 0
  },
  qEng_UserOne:{
    spending_limit: 0,
    earned_tokens: 0,
    usd_balance: 0
  },
  qEng_UserTwo:{
    spending_limit: 0,
    earned_tokens: 0,
    usd_balance: 0
  },
  qEng_GrowthBot:{
    spending_limit: 0,
    earned_tokens: 0,
    usd_balance: 0
  }
}


module.exports = {GENERAL_CACHE, SYSTEM_CACHE, USER_CACHE}
