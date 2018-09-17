const SUPERGROUP_ID = '-1001241579924';
const ESCROW_ACCOUNT = '0xf70d09b4240216741c0316ec2d5c61556f57987e';

const ALLOWED_COMMANDS = {
  ADMIN: [
    '/ban', '/unban', '/set_cycle', '/set_bounty',
    '/set_daily_award', '/award', '/deduct'],
  USER: [
    '/tip', '/upvote', '/balance', '/redeem']
};

module.exports = {
  SUPERGROUP_ID, ESCROW_ACCOUNT, ALLOWED_COMMANDS
}
