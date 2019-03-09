let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');

// Import libraries
let Web3            = require('web3'),
    contract        = require("truffle-contract"),
    MyContractJSON  = require(path.join(__dirname, '../crypto-bike-abi/build/contracts/CryptoBike.json'));

// Setup RPC connection   
let provider    = new Web3.providers.HttpProvider("http://localhost:8545");


// Read JSON and attach RPC connection (Provider)
var MyContract = contract(MyContractJSON);
MyContract.setProvider(provider);

deploy();

async function deploy() {
  // Use Truffle as usual
  MyContract.deployed().then((instance) => {
    let promise = instance.add_bike.call('dfhgjhsd', 'arg2', 'arg3', {from: ' 0x56d0b7b49a58a80db230c99f1c5af29633c55730'})
    // return promise;
  }).then(function(result) {
      console.log(result);
  
  }).catch((error) => {
    throw(error);
  }); 
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/bike_form', (req, res) => {
  console.log(':\'(');
  
  let html_path = path.join(__dirname, '..', 'views', 'login_modal.html');
  fs.readFile(html_path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.status(200).send(data);
  }).catch((err) => {
    res.status(500).send(err);
  });
})

/* POST test */
router.post('/test', function(req, res, next) {
  res.send(req.body)
});

/* Book Bike */
router.post('/book_bike', function(req, res, next) {
  console.log(req.body);
  res.status(200).send('Booked');
});

module.exports = router;
