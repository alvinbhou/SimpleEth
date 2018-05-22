/* 
*   jQuery plugin SimpleEth
*/
(function ($) {
    $.fn.SimpleEth = function (options) {
        var self = this;
        /* 
        *   default transaction options
        */
        var _options = {
            from: '0xffb219f6781e7111f89f234c97807aae4255c59d',
            to: '0xffb219f6781e7111f89f234c97807aae4255c59d',
            value: web3.toWei(0.1, 'ether'),
            gas: 21000,
            gasPrice: web3.toWei(20, 'gwei'),
            data: '0x',
        };
        /*
        *   user defined options
        */
        for (var key in options) {
            if (options.hasOwnProperty(key) && _options.hasOwnProperty(key)) {
                /* value to ether */
                if (key == 'value') {
                    _options[key] = web3.toWei(options[key], 'ether');
                }
                /* gasPrice to ether */
                else if (key == 'gasPrice') {
                    _options[key] = web3.toWei(options[key], 'gwei');
                }
                /* data to byte code */
                else if (key == 'data') {
                    _options[key] = _options[key] + options[key].split('').map(function (c) { return c.charCodeAt(0).toString(16); }).join("");
                }
            }
        }
        /* prevent intrinsic gas too low */
        _options['gas'] = (_options['gas'] > 21000 + 68 * _options['data'].length) ? _options['gas'] : 21000 + 68 * _options['data'].length;
        self.each(function () {
            $(this).click(function () {
                console.log(_options);
                metamaskLoginStatus(function (status) {
                    if (status.login) {
                        web3.eth.sendTransaction(_options, function (error, result) {
                            console.log({ 'TxHash': result });
                        });
                    }
                    else {
                        console.log("Cannot send transaction");
                    }
                })

            });
        });
    }
}(jQuery));


/* 
*   Metamask Utility functions
*/
const metamaskLoginStatus = function(callback){
    web3.eth.getAccounts(function(err, accounts){
        if (err != null){
            console.error("An error occurred: "+err);
            callback({login: false});
        } 
        else if (accounts.length == 0){
            console.log("User is not logged in to MetaMask");
            callback({login: false});
        } 
        else {
            callback({login: true, accounts:accounts});
        }}
    );
}