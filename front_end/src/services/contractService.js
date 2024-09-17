import blockchainService from './blockchainService';

const contractService = {
//   getMyContracts: async () => {
//     const contracts = await blockchainService.fetchMyContracts();
//     return contracts;
//   },
getMyContracts: async () => {
    // const contracts = await blockchainService.fetchMyContracts();
    // return contracts;
    return [
      { id: 1, propertyId: 1, price: 1000, type: '买入',status:'长期持有',date:'2020-04-01' },
      { id: 2, propertyId: 2, price: 2000, type: '租赁',status:'2024-10-1到期',date:'2020-04-01' },
    ];
  },
};

export default contractService;
