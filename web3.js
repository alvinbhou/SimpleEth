var Web3 = require('web3');
// set the provider of web3
if (typeof Web3 !== 'undefined') {
    console.log(Web3.givenProvider || 'http://localhost:9099');
    var web3 = new Web3(Web3.givenProvider);
    
  
} else {
    console.log("No currentProvider for web3");
}