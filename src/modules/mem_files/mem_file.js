const {SUPERGROUP_ID, ESCROW_ACCOUNT, USER_ACCOUNTS, ALLOWED_COMMANDS} =
require('../constants/constants');

var ADMIN_CACHE = {
  bounty_amount: 0,
  daily_award: 0,
  cycle_period: 0
};

var USER_CACHE = {
  qEng_Admin: {
    available_spending_tokens: 0,
    earned_tokens: 0,
    usd_balance: 0
  },
  qEng_UserOne:{
    available_spending_tokens: 0,
    earned_tokens: 0,
    usd_balance: 0
  },
  qEng_UserTwo:{
    available_spending_tokens: 0,
    earned_tokens: 0,
    usd_balance: 0
  },
  qEng_GrowthBot:{
    available_spending_tokens: 0,
    earned_tokens: 0,
    usd_balance: 0
  }
}

module.exports = {ADMIN_CACHE, USER_CACHE}
