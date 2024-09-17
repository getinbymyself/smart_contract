// src/components/Dashboard/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Menu mode="horizontal">
      <Menu.Item key="my-properties">
        <Link to="/my-properties">我的房产</Link>
      </Menu.Item>
      <Menu.Item key="add-property">
        <Link to="/add-property">添加房源</Link>
      </Menu.Item>
      <Menu.Item key="listings">
        <Link to="/listings">房源列表</Link>
      </Menu.Item>
      <Menu.Item key="contracts">
        <Link to="/contracts">我的合约</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        注销
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
