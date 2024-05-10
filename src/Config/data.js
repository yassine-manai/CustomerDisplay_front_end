require('dotenv').config({ path: '../../.env' });

// Access the environment variables
const {REACT_APP_API_IP, REACT_APP_WS_IP, REACT_APP_WS_PORT, REACT_APP_MainFiles, REACT_APP_FooterFiles } = process.env;

console.log(`APP_IP: ${REACT_APP_API_IP}`);
console.log(`WS_IP: ${REACT_APP_WS_IP}`);
console.log(`WS_PORT: ${REACT_APP_WS_PORT}`);
console.log(`MainFiles: ${REACT_APP_MainFiles}`);
console.log(`FooterFiles: ${REACT_APP_FooterFiles}`);

module.exports = { REACT_APP_API_IP, REACT_APP_WS_IP, REACT_APP_WS_PORT, REACT_APP_MainFiles, REACT_APP_FooterFiles };
