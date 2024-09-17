import web3 from './web3';
import RealEstate from '../contracts/RealEstate.json';

const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // 替换为部署的合约地址

const realEstateContract = new web3.eth.Contract(RealEstate.abi, contractAddress);

export default realEstateContract;
