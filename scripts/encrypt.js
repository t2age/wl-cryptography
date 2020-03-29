const openpgp = require('openpgp'); 
openpgp.initWorker({ path:'./node_modules/openpgp/dist/openpgp.worker.js' });
openpgp.config.aead_protect = false;
openpgp.config.show_version = false
openpgp.config.show_comment = false

function encryptString(msgToEncrypt) {
	(async () => {
		var fs = require('fs');
		var pubkey = fs.readFileSync('pubkeyAlice.asc', 'utf8');
				
		const { data: encrypted } = await openpgp.encrypt({
			message: openpgp.message.fromText(msgToEncrypt),
			publicKeys: (await openpgp.key.readArmored(pubkey)).keys
		});
		
		console.log(encrypted)
		fs.writeFileSync('encrypted.txt', encrypted);	
	})();
}

encryptString("hello people");
