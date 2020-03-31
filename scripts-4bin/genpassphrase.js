// This code "normaly" requires "npm install uuid" to work
// Here, the module uuid is ALREADY installed,
// so, there is no need to run "npm install uuid" AGAIN...
//
// If you are installing/copying this code to a new
// machine/different folder, then you need to install it
// with "npm install uuid"
//
const uuidv4 = require('uuid').v4;
var fullPassphrase = uuidv4() + "-" + uuidv4() + "-" + uuidv4();

console.log ( fullPassphrase );

var fs = require('fs');
fs.writeFileSync('passphraseAlice.txt', fullPassphrase + '\n');
