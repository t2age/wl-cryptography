// read a crypto binary file
// and decrypt it to a (normal) binary file

const openpgp = require('openpgp'); 
openpgp.initWorker({ path:'./node_modules/openpgp/dist/openpgp.worker.js' });
openpgp.config.aead_protect = false;
openpgp.config.show_version = false
openpgp.config.show_comment = false

function decryptString() {
	var options, encrypted;
	
	(async () => {
		var fs = require('fs');
		var passphraseText = fs.readFileSync('passphraseAlice.txt', 'utf8').trim();	
		var privkey = fs.readFileSync('privkeyAlice.asc', 'utf8');
		const { keys: [privateKey]} = await openpgp.key.readArmored(privkey);
		await privateKey.decrypt(passphraseText);
		
		options = {
			message: await openpgp.message.read(msgEncrypted),
			privateKeys: [privateKey],
			format: 'binary'
		};
		
		openpgp.decrypt(options).then(function(plaintext) {
			fs.writeFileSync('data-decrypted-bin-bin.dat', plaintext.data);
		}); 	

	})();
}

var fs = require('fs');
var msgEncrypted = fs.readFileSync('encrypted-bin-bin.crypt');
decryptString();
