const openpgp = require('openpgp'); 
openpgp.initWorker({ path:'./node_modules/openpgp/dist/openpgp.worker.js' });

openpgp.config.aead_protect = false;
openpgp.config.show_version = false;
openpgp.config.show_comment = false;

var fs = require('fs');
var passphraseText = fs.readFileSync('passphraseAlice.txt', 'utf8').trim();

var options = {
    userIds: [{ name: 'Alice', email: 'alice@aliceflower.com' }],
    numBits: 2048,
    passphrase: passphraseText
};

var pubKey, privKey;
openpgp.generateKey(options).then(key => {
    privKey	= key.privateKeyArmored;
    pubKey	= key.publicKeyArmored;
     
    var fs = require('fs');
	fs.writeFileSync('privkeyAlice.asc', privKey);
	fs.writeFileSync('pubkeyAlice.asc', pubKey);
    console.log(privKey);
    console.log(pubKey);
    console.log('Keys generated');
});
