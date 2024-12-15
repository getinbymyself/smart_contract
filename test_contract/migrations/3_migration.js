const MainService = artifacts.require("MainService");

module.exports = function(deployer, network, accounts) {
    const ownerAddress = accounts[0];  // 使用第一个账户作为合约所有者
    deployer.deploy(MainService, ownerAddress);
};

