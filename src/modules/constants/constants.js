const SUPERGROUP_ID = '-1001241579924';
const ESCROW_ACCOUNT = '0xf70d09b4240216741c0316ec2d5c61556f57987e';

const USER_ACCOUNTS = [
  {username: "qEng_Admin", wallet_id: "0x41bd2699334286eb8ab0d638ec06b21a4d104c9e" },
  {username: "qEng_UserOne", wallet_id: "0x6884194ff603ddb44dabfdd03401cd09739aa19b"},
  {username: "qEng_UserTwo", wallet_id: "0x4c159ad5b15a3b2faec13c2214f37db8732bb41b"},
  {username: "qEng_GrowthBot", wallet_id: "0xf70d09b4240216741c0316ec2d5c61556f57987e"}
];


const ALLOWED_COMMANDS = {
  ADMIN: [
    '/ban', '/unban', '/set_cycle', '/set_bounty',
    '/set_daily_award', '/award', '/deduct'],
  USER: [
    '/tip', '/upvote', '/balance', '/redeem']
};

module.exports = {
  SUPERGROUP_ID, ESCROW_ACCOUNT, USER_ACCOUNTS, ALLOWED_COMMANDS
}
