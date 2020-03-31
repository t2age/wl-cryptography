// read a (normal) binary file
// and encrypt it to a armor (ASCII) crypto file

const openpgp = require('openpgp'); 
openpgp.initWorker({ path:'./node_modules/openpgp/dist/openpgp.worker.js' });
openpgp.config.aead_protect = false;
openpgp.config.show_version = false
openpgp.config.show_comment = false

function encryptString() {
	var fs = require('fs');
	var msgToEncrypt = fs.readFileSync('data.dat');
	(async () => {
		
		var pubkey = fs.readFileSync('pubkeyAlice.asc', 'utf8');
				
		const { data: encrypted } = await openpgp.encrypt({
			message: openpgp.message.fromBinary(msgToEncrypt),
			publicKeys: (await openpgp.key.readArmored(pubkey)).keys,
			format: 'binary'
		});
		
		console.log(encrypted)
		fs.writeFileSync('encrypted-bin.txt', encrypted);	
	})();
}

encryptString();
