const MainService = artifacts.require("MainService");
console.log("123");
contract('MainService',function(accounts){
	//it("first",function(){
	//console.log(MainService);
	console.log(MainService.deployed());
		MainService.deployed().then(function(instance){
			console.log(instance.address)
			instance.addPerson(0x1234567890123456789012345678901234567890,2).then(function(result) {
				console.log("4");
			})
			
		})
	//})

	
})


