// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.4.25;
import "./Roles.sol";
contract MainService is Roles{

    constructor(address _owner) public Roles(_owner){

    }

    ///////////////
    //// Type
    ///////////////

    struct Person {
        address account;
        uint balance;
    }

    struct House {
        uint houseId;
        string password;
    }
    struct Contract {
        uint contractId;
        address landlord; // 房东->发布者
        address tenant; // 租客
        uint earnest; // 规定保证金
        uint rent;  // 规定租金
        bool isTenEarnest; // 租客是否缴纳保证金
        bool isTenRent; // 租客是否缴纳租金
        bool isLanEarnest; // 房东是否缴纳保证金
        bool begin; // 是否生效
        bool stop; // 是否终止getContract
        uint tenancyTerm; // 租赁期限 单位: 月份
        uint endTime; // 结束日期 ->合同结束日期
        uint beginTime; // 开始日期 ->合同生效日期
    }

    struct Payment {
        uint paymentId;
        uint contractId;
        uint money;
    }

    ///////////////
    //// Filed
    ///////////////
    uint  constant private  Month = 1 days * 30;
    string  constant private  Role_Landlord = "Landlord";
    string  constant private  Role_Tenant = "Tenant";

    
    mapping(address=>Person) personMap;
    mapping(uint=>House) houseMap;

    mapping(uint=>Contract) signContractMap;
    mapping(uint=>uint) signendTimeMap; // 签署之后,要想生效的截止时间

    mapping (uint=>Payment) paymentMap; 
    uint[] payments;

    ///////////////
    //// Function
    ///////////////

    modifier onlyLandlord() {
        Person memory person = personMap[msg.sender];
        require(hasRole(Role_Landlord,msg.sender),"40014");
        _;
    }

    modifier onlyTenant() {
        require(hasRole(Role_Tenant,msg.sender),"40015");
        _;
    }
    // 添加用户
    function addPerson(address _account,uint8 choice)  public onlyOwner {//仅管理员可以执行
        checkEmptyAddress(_account);//账户地址非空地址
        require(choice == 2 || choice == 3,"40010");//账户身份合法
        Person memory person;
        if(choice == 2){
            addRole(Role_Landlord,_account);
        }
        else{
            addRole(Role_Tenant,_account);
        }
        person.account = _account;
        person.balance = 0;//余额清零
        personMap[_account] = person;
    }
    // 删除用户
    function removeRole(address _account,uint8 choice) public onlyOwner {
        checkEmptyAddress(_account);
        require(choice == 2 || choice == 3,"40010");
        Person memory person;
        if(choice == 2){
            removeRole(Role_Landlord,_account);
        }
        else{
            removeRole(Role_Tenant,_account);
        }
        person.balance = 0;//余额清零
        person.account = 0;//账户注销
        personMap[_account] = person;
    }
    // 查询余额
    function getBalance(address _account) public view returns (uint) {
        checkEmptyAddress(_account);
        checkAccountExists(_account);//确定账户存在
        Person memory person = personMap[_account];
        return person.balance;
    }
    // 充值
    function addBalance(address _account,uint money) public onlyOwner {
        checkEmptyAddress(_account);
        checkAccountExists(_account);  
        Person storage person = personMap[_account];
        person.balance += money;
    }
    // 校验账户是否存在
    function checkAccountExists(address _account) public view {
        Person memory person = personMap[_account];
        require(person.account != address(0),"40013");
    }
    //查询用户身份
    function getPersonroles(address _account) public view returns (string){
        checkEmptyAddress(_account);
        checkAccountExists(_account);
        uint8 flag = 0;
        if (hasRole(Role_Landlord,_account) == true){
            flag = 1;
        }
        if (flag == 1){
            return Role_Landlord;
        }
        else{
            return Role_Tenant;
        }
    }
    // 房屋管理------------------
    // 添加房屋
    function addHouse(uint houseId, string password) public onlyLandlord{//仅有房东可添加房屋
        uint id = houseId;
        require(id != 0,"40009");
        House memory house = House(id,password);
        houseMap[id] = house;
    }
    //删除房屋
    function removeHouse(uint houseId) public onlyLandlord{
        uint id = houseId;
        require(id != 0,"40009");
        House storage house = houseMap[id];
        house.houseId = 0;
        house.password = 0;
    }
    // 修改密码
    function changeHousePasswd(uint houseId, string password) public onlyOwner {
        uint id = houseId;
        House storage house = houseMap[id];
        house.password = password;
    }
    // 获取房屋信息
    function getHouseInformation(uint houseId, uint contractId) public view returns (uint,string memory) {
        judgeArrears(contractId);//首先看是否欠租，若欠租则房屋非法，无法进行后续操作
        House memory house = houseMap[houseId];
        return (house.houseId,house.password);
    }
    // 获取房屋信息(管理员调用)
    function getHouseAdmin(uint houseId)public view onlyOwner returns (uint,string memory) {
        House memory house = houseMap[houseId];
        return (house.houseId, house.password);
    }
    //查看租客是否欠租
    function judgeArrears(uint contractId) public view{
        require(getRealPayRent(contractId) >= computeTarPayRent(contractId),"40002");
    }
    // 缴纳管理------------------
    // 检查交易编号是否重复
    function checkLegalPayment(uint paymentId) public view{
        uint length = payments.length
        uint flag = 1;
        for(uint i = 0;i < length;i++){
            if(paymentId == payments[i]){
                flag = 0;
            }
        }
        require(flag == 1,"41000");
    }
    // 缴纳租金
    function payRent(uint paymentId,uint contractId,uint money) public onlyTenant {
        checkSignContractExists(contractId);
        checkLegalPayment(paymentId);
        Payment memory payment = Payment(paymentId, contractId, money);
        paymentMap[paymentId] = payment; 
        payments.push(paymentId);
        address landlord = signContractMap[contractId].landlord; 
        personMap[landlord].balance += money;
    }
    // 获取缴纳信息
    function getPayRent(uint paymentId) public view returns(uint,uint,uint) {
        Payment memory payment = paymentMap[paymentId];
        return (payment.paymentId, payment.contractId, payment.money);
    }
    //查询月数
    function getMonth(uint contractId) private view  returns (uint8) {
        uint nowT = now();
        Contract memory c = signContractMap[contractId];
        uint8 realtime = uint8((nowT - c.beginTime) /  Month)
        return realtime;
    }
    // 计算目标缴纳租金:已经租了几个月,计算几个月的金额
    function computeTarPayRent(uint contractId) private view returns (uint){
        uint months =  getMonth(contractId);
        Contract memory c = signContractMap[contractId];
        return months * c.earnest;
    }
    //查询实际缴纳的租金
    function getRealPayRent(uint contractId) private view returns (uint) {
        uint money = 0;
        uint length = payments.length;
        for (uint i = 0; i < length; i++) {
            uint id = payments[i];
            Payment memory pay = paymentMap[id];
            if(pay.contractId == contractId){
                money += pay.money;
            }
        }
        return money;
    }



}