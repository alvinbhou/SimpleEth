# SimpleEth
> A simple Simple jQuery plugin for sending Ethereum with Metamask

[Demo Website](https://cryolite.com.tw/)

## Usage
```
$('.eth-btn').SimpleEth(options, callback);
```

## Options
| Parameter |  Default  | Type| 
|-----  | -------|  -------|  
|from   |  Metamask Wallet Address  | String |
|to     |  0xffb219f6781...    | String
|value  |  0 (unit: ether) | Number |
|gas    |  21000  | Integer|
|gasPrice  |  20 (unit: gwei)| Integer |
|data   |  ""  | String |
|$value   |  null | jQuery Obj.|
|$data   |  null | jQuery Obj.|

## Example

### Simple Button for Donation

```
$('#donate-btn').SimpleEth({
    to: '0x..',
    value: 1.2,
    gas: 21000,
    gasPrice: 30,
    data: 'Hi there!',
},mycallback);
```

### Transaction with custom input value

```
$('#donate-amount-btn').SimpleEth({
    to: '0x'
    $value: $('#donate-amount-input')
});
```
The transaction will use the value in the selected input field.

### Transaction with custom message
```
$('#donate-mssg-btn').SimpleEth({
    to: '0x',
    value: 0.66,
    $data: $('#donate-mssg')
});
```
The transaction will use the data in the selected input field.



