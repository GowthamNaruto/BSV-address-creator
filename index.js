// Introduction to Bsv library
// create randam private key and public key ----------------------------------------------------------------
// var privateKey = bsv.PrivateKey.fromRandom();
// var p = document.querySelector('#library');
// p.innerHTML = 'BSV.js library Initialized! <br> <br>' + privateKey.toString();

// 2) Step 2: Generate the Private Key
// var privKey = bsv.PrivateKey.fromRandom();
// var pubKey = bsv.PublicKey.fromPrivateKey(privKey);

// var p = document.querySelector('#privText');
// p.innerHTML = privKey.toString();

// var y = document.querySelector('#pubText');
// y.innerHTML = pubKey.toString();

// 3) Generate the Address fron the Public Key usibg bsv library
var privKey = bsv.PrivateKey.fromRandom();
var pubKey = bsv.PublicKey.fromPrivateKey(privKey);
var address = bsv.Address.fromPublicKey(pubKey);

var password = 'Aruljothi1596arutperunjothi';

var ciphertext = CryptoJS.AES.encrypt(privKey.toString(), password).toString();

var bytes = CryptoJS.AES.decrypt(ciphertext, password);
var originalText = bytes.toString(CryptoJS.enc.Utf8);

// Update the DOM content of private key
var p = document.querySelector('#privKey');
p.innerHTML = privKey.toString();

// Update the DOM content of Public key
var y = document.querySelector('#pubKey');
y.innerHTML = pubKey.toString();

// Update the DOM content of Address
var addr = document.querySelector('#address');
addr.innerHTML = address.toString();

// Update the DOM content of Encryption
var eCryp = document.querySelector('#encrypted');
eCryp.innerHTML = ciphertext.toString();

// Update the DOM content of Decryption
var dCryp = document.querySelector('#decrypted');
dCryp.innerHTML = originalText.toString();

// Generate address with bitcoinsv
var addressCode = 'bitcoinsv:' + address;

// Create a new QRCode for the generated addressCode
new QRCode(document.getElementById('qrcode'), addressCode);

// Get the balance for the generated addressCode
// using whatsonchain API with axios
var config = {
  method: 'get',
  url:
    'https://api.whatsonchain.com/v1/bsv/main/address/' + address + '/balance',
};

axios(config).then((response) => {
  let data = JSON.stringify(response.data);
  let p = document.getElementById('balance');
  p.innerHTML = data;
});

// 4) Generate a HDkey pair from bsv library

// Generating private key from mnemonic string
var bsvMnemonic = window.bsvMnemonic;
var words = bsvMnemonic.fromRandom();

var hdPrivateKey = bsv.HDPrivateKey.fromSeed(words.toSeed());

var hdPublicKey = bsv.HDPublicKey.fromHDPrivateKey(hdPrivateKey);

var hdPrivKey = document.querySelector('#Text');
var hdPrivKeyStr = hdPrivateKey.toString();
hdPrivKey.innerHTML = hdPrivKeyStr;

var hdPubKey = document.querySelector('#Text1');
hdPubKey.innerHTML = hdPublicKey.toString();

// Generate private key 1,2,3 from generated HD Private Key
var hdPrivateKeyStr = bsv.HDPrivateKey.fromString(hdPrivKeyStr);

var privateKeyStandard = hdPrivateKeyStr.deriveChild("m/44'/0'/0'");
var privateKeyHd = privateKeyStandard.privateKey;

var privateKeyStandard2 = hdPrivateKeyStr.deriveChild("m/45'/0'/0'");
var privateKeyHd2 = privateKeyStandard2.privateKey;

var privateKeyStandard3 = hdPrivateKeyStr.deriveChild("m/46'/0'/0'");
var privateKeyHd3 = privateKeyStandard3.privateKey;

var firstPrivKey = document.querySelector('#Text3');
firstPrivKey.innerHTML = privateKeyHd.toString();

var secondPrivKey = document.querySelector('#Text4');
secondPrivKey.innerHTML = privateKeyHd2.toString();

var thirdPrivKey = document.querySelector('#Text5');
thirdPrivKey.innerHTML = privateKeyHd3.toString();

// 3) Generating bitcoin address from private key
let privateKey = bsv.PrivateKey.fromRandom();
let addres = bsv.Address.fromPrivateKey(privateKey);
let address1 = addres.toString();
console.log(address1);

// 4) Generating Derived key form random private key and deriving  hardened private key from child private key
var childPrivateKey = hdPrivateKey.deriveChild('m/44/0/0');

var hardenedPrivateKey = hdPrivateKey.deriveChild("m/44'/0'/0'");

var child = document.querySelector('#Derived');
child.innerHTML = childPrivateKey.toString();
console.log(childPrivateKey);

var hardened = document.querySelector('#Hardened');
hardened.innerHTML = hardenedPrivateKey.toString();

// 5) Generateing Mnemonic words from BSV library
var bsvMnemonic = window.bsvMnemonic;
var words = bsvMnemonic.fromRandom();

var phrase = document.querySelector('#phrase');
phrase.innerHTML = words.toString();
