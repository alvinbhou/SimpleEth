/* 
 *   jQuery plugin SimpleEth
 *   @author CryoliteZ
 */
(function ($) {
    /* 
     *   Metamask Utility functions
     */
    const util = {
        metamaskLoginStatus: function (callback) {
            web3.eth.getAccounts(function (err, accounts) {
                if (err != null) {
                    console.error("An error occurred: " + err);
                    callback({
                        login: false
                    });
                } else if (accounts.length == 0) {
                    console.log("User is not logged in to MetaMask");
                    callback({
                        login: false
                    });
                } else {
                    callback({
                        login: true,
                        accounts: accounts
                    });
                }
            });
        },
        ascii2byte: function (str) {
            return str.split('').map(function (c) {
                return c.charCodeAt(0).toString(16);
            }).join("");
        }
    }

    $.fn.SimpleEth = function (options, _callback = null) {
        const _self = this;
        /* 
         *   default transaction options
         */
        let _options = {
            to: '0xffb219f6781e7111f89f234c97807aae4255c59d',
            value: web3.toWei(0, 'ether'),
            gas: 21000,
            gasPrice: web3.toWei(20, 'gwei'),
            data: '',
            callback: null
        };

        /*
         *   user defined options
         */
        for (let key in options) {
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
                    _options[key] = _options[key] + util.ascii2byte(options[key]);
                } else {
                    _options[key] = options[key];
                }
            }
        }
        _self.each(function () {
            $(this).click(function () {
                /* bind value input */
                if (options['$value']) {
                    let reg_number = /^[+-]?\d+(\.\d+)?$/;
                    let $val = options['$value'].val();
                    if (reg_number.test($val)) {
                        _options['value'] = web3.toWei($val, 'ether');
                    }
                }
                /* bind data input */
                if (options['$data']) {
                    _options['data'] = util.ascii2byte(options['$data'].val());
                }
                /* prevent intrinsic gas too low */
                _options['gas'] = (_options['gas'] > 21000 + 68 * (_options['data'].length-2)) ? _options['gas'] : 21000 + 68 * (_options['data'].length-2);
                util.metamaskLoginStatus(function (status) {
                    if (status.login) {
                        /* get "from" address */
                        if (options.from) {
                            _options['from'] = options['from'];
                        } else {
                            _options['from'] = status.accounts[0];
                        }
                        web3.eth.sendTransaction(_options, function (error, result) {
                            console.log({options: _options, TxHash: result, err: error, login: true});
                            if(_callback){
                                _callback({options: _options, TxHash: result, err: error, login: true});
                            }
                            else{
                                console.log({'TxHash': result})
                            }
                        });
                    } else {
                        if(_options.callback){
                            _callback({options: _options, login: false});
                        }
                        console.log("Cannot send transaction");
                    }
                })

            });
        });
    }
}(jQuery));