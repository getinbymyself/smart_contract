import blockchainService from './blockchainService';

const propertyService = {
  getMyProperties: async () => {
    // // 调用区块链服务或后端 API 获取当前用户的房产
    // const properties = await blockchainService.fetchMyProperties();
    // return properties;
    return [
                { id: 1, location: '北京', area: '120平米', houseType: '三居室' },
                { id: 2, location: '上海', area: '90平米', houseType: '两居室' },
              ];
  },
  listProperty: async (propertyId, price, isForRent) => {
    // 调用区块链服务将房产挂牌
    // await blockchainService.listProperty(propertyId, price, isForRent);
    alert('房产已挂牌成功！');
  },
  addProperty: async (property) => {
        // 调用区块链服务或后端 API 添加新房产
        // await blockchainService.addProperty(property);
        alert('房产添加成功！');
        return ;
    },
  // 添加获取挂牌房产的方法
  getAllListings: async (isForRent) => {
    // const properties = await blockchainService.fetchListedProperties(isForRent);
   // return properties;
   return [
    { id: 1, location: '北京', area: '120平米', houseType: '三居室',price:1000000000000,isForRent:1 },
    { id: 2, location: '上海', area: '90平米', houseType: '两居室' ,price:1000,isForRent:0 },
  ];
  },
  // 添加购买/租赁房产的方法
  purchaseProperty: async (propertyId, price, isForRent) => {
    // await blockchainService.purchaseProperty(propertyId, price, isForRent);

  },
  getMyContracts: async () => {
    // const contracts = await blockchainService.fetchMyContracts();
    // return contracts;
    return [
      { id: 1, propertyId: 1, price: 1000, type: '买入',status:'长期持有',date:'2020-04-01' },
      { id: 2, propertyId: 2, price: 2000, type: '租赁',status:'2024-10-1到期',date:'2020-04-01' },
    ];
  },
  
};
export default propertyService;
// src/services/propertyService.js
// const propertyService = {
//     getMyProperties: async () => {
//       // 模拟获取房产信息
//       return [
//         { id: 1, location: '北京', area: '120平米', houseType: '三居室' },
//         { id: 2, location: '上海', area: '90平米', houseType: '两居室' },
//       ];
//     },
//   };
  
// export default propertyService;
  

