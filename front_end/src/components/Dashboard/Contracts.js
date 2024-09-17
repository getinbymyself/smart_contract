import React, { useEffect, useState } from 'react';
import contractService from '../../services/contractService';

function Contracts() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    async function fetchContracts() {
      const data = await contractService.getMyContracts();
      setContracts(data);
    }
    fetchContracts();
  }, []);

  return (
    <div id="contracts">
      <h2>我的合约</h2>
      <table>
        <thead>
          <tr>
            <th>合约ID</th>
            <th>房产ID</th>
            <th>类型</th>
            <th>状态</th>
            <th>交易日期</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.id}>
              <td>{contract.id}</td>
              <td>{contract.propertyId}</td>
              <td>{contract.type}</td>
              <td>{contract.status}</td>
              <td>{contract.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Contracts;
