const MainService = artifacts.require("MainService");

contract('MainService', function(accounts) {
    it("first", function() {
        return MainService.deployed().then(function(instance) {
            // 检查合约实例
            console.log(instance.address); // 输出地址以确认合约部署
            
            // 调用 addPerson，传入 2 个参数
            return instance.addPerson("0x1234567890123456789012345678901234567890", 2)
            .then(function(result) {
                console.log(result); // 结果
            });
        });
    });
});

