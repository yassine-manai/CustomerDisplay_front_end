require('dotenv').config({ path: '../../../.env' });

// Access the environment variables
const {REACT_APP_API_IP, REACT_APP_WS_IP, REACT_APP_WS_PORT } = process.env;

console.log(`APP_IP: ${REACT_APP_API_IP}`);
console.log(`WS_IP: ${REACT_APP_WS_IP}`);
console.log(`WS_PORT: ${REACT_APP_WS_PORT}`);


module.exports = { REACT_APP_API_IP, REACT_APP_WS_IP, REACT_APP_WS_PORT};
