//var ROOT_SERVER_URL = 'http://localhost:3000';
const {TOKEN_CONTRACT_ABI} = require('./abis/token');
// import {BRAINPART_CONTRACT_ABI} from "./abi/brainpart";

// export const NETWORK_ID = "4";
// export const ROOT_SERVER_URL = 'https://brainfunc-landing-page-server.herokuapp.com';

const CONTRACTS = {
  TOKEN: {
    "CREATOR": "0x51fa18f7d344294e13490e4172cdb55912f38779",
    "ADDRESS": "0xe1f3e003b3d78981d102b1193b9ba301b5ef9c72",
    "ABI": TOKEN_CONTRACT_ABI
  }
}

module.exports = {
  CONTRACTS
}
