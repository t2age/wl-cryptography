// read a (normal) binary file
// and encrypt it to a crypto binary file

const openpgp = require('openpgp'); 
openpgp.initWorker({ path:'./node_modules/openpgp/dist/openpgp.worker.js' });
openpgp.config.aead_protect = false;
openpgp.config.show_version = false
openpgp.config.show_comment = false

function encryptString() {
	var fs = require('fs');
	var msgToEncrypt = fs.readFileSync('data.dat');
	var pubkey = fs.readFileSync('pubkeyAlice.asc', 'utf8');
			
	var options, encrypted;
	
	(async () => {
		
		options = {
			message: openpgp.message.fromBinary(msgToEncrypt),
			publicKeys: (await openpgp.key.readArmored(pubkey)).keys,
			armor: false
		};
		
		openpgp.encrypt(options).then(function(ciphertext) 
		{
			encrypted = ciphertext.message.packets.write();
			fs.writeFileSync('encrypted-bin-bin.crypt', encrypted);
			//console.log(encrypted)
		});	
		
	})();
}

encryptString();
