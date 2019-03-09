var CryptoBike = artifacts.require("./CryptoBike.sol");

module.exports = function(deployer) {
    deployer.deploy(CryptoBike);
};