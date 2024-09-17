import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import propertyService from '../../services/propertyService';

function AddProperty() {
  const onFinish = async (values) => {
    await propertyService.addProperty(values);
    alert('房源添加成功！');
  };

  return (
    <div className="add-property-container">
      <h2>添加房源</h2>
      <Form onFinish={onFinish}>
        <Form.Item
          label="位置"
          name="location"
          rules={[{ required: true, message: '请输入房源位置！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="面积"
          name="area"
          rules={[{ required: true, message: '请输入房源面积！' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          label="户型"
          name="houseType"
          rules={[{ required: true, message: '请输入房源户型！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加房源
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddProperty;
