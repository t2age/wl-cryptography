// read and armor (ASCII) encrypted file 
// and decrypt to a (normal) binary file

const openpgp = require('openpgp'); 
openpgp.initWorker({ path:'./node_modules/openpgp/dist/openpgp.worker.js' });
openpgp.config.aead_protect = false;
openpgp.config.show_version = false
openpgp.config.show_comment = false

function decryptString() {
	(async () => {
		var fs = require('fs');
		var passphraseText = fs.readFileSync('passphraseAlice.txt', 'utf8').trim();	
		var privkey = fs.readFileSync('privkeyAlice.asc', 'utf8');
		
		const { keys: [privateKey]} = await openpgp.key.readArmored(privkey);
		await privateKey.decrypt(passphraseText);
		
		const { data: decrypted } = await openpgp.decrypt({
			message: await openpgp.message.readArmored(msgEncrypted),
			privateKeys: [privateKey],
			format: 'binary'
		});
		
		//console.log(decrypted)
		fs.writeFileSync('data-decrypted.dat', decrypted);
	})();
}

var fs = require('fs');
var msgEncrypted = fs.readFileSync('encrypted-bin.txt', 'utf8').trim();
decryptString();
