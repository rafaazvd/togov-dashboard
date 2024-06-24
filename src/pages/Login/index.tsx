import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { login } from '../../services/modules/Login';
import logo from '../../assets/logo-togov.png'

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await login(values.username, values.password);
      localStorage.setItem('token', response.data.access_token);
      navigation('/dashboard');
    } catch (error) {
      message.error('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', margin: '100px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img alt='logo' style={{height: 300, width: 300}} src={logo} />
      <Form style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}} name="login" onFinish={onFinish}>
        <Form.Item
        style={{ width: '70%'}}
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
        style={{ width: '70%'}}
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button style={{padding: '20px', width: 300}} type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
