// src/components/Auth/Register.js
import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const success = await authService.register(values);
    if (success) {
      login(values);
      navigate('/dashboard');
    } else {
      alert('注册失败，请重试。');
    }
  };

  return (
    <div className="register-container">
      <h2>注册</h2>
      <Form onFinish={onFinish}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名！' }]}
        >
          <Input />
        </Form.Item>
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
            注册
          </Button>
          <span style={{ marginLeft: '10px' }}>
            已有账号？<Link to="/login">登录</Link>
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
