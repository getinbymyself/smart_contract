// src/components/Auth/Login.js
import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const success = await authService.login(values);
    if (success) {
      login(values);
      navigate('/dashboard');
    } else {
      alert('登录失败，请检查您的凭证。');
    }
  };

  return (
    <div className="login-container">
      <h2>登录</h2>
      <Form onFinish={onFinish}>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: '请输入邮箱！' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <span style={{ marginLeft: '10px' }}>
            还没有账号？<Link to="/register">注册</Link>
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
