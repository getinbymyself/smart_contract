// src/components/Dashboard/MyProperties.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Radio } from 'antd';
import propertyService from '../../services/propertyService';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [listingType, setListingType] = useState(''); // 记录挂牌类型
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchProperties() {
      const data = await propertyService.getMyProperties();
      setProperties(data);
    }
    fetchProperties();
  }, []);

  // 打开挂牌对话框
  const showListingModal = (property) => {
    setSelectedProperty(property);
    setIsModalVisible(true);
  };

  // 提交挂牌操作
  const handleListing = async () => {
    try {
      const values = await form.validateFields();
      let finalPrice = values.price;

      // 如果是出售，将价格乘以1万
      if (values.listingType === '出售') {
        finalPrice = values.price * 10000;
      }

      await propertyService.listProperty(selectedProperty.id, finalPrice, values.listingType);
      setIsModalVisible(false);
      form.resetFields();
      alert('房源挂牌成功');
    } catch (error) {
      console.error('挂牌操作失败:', error);
    }
  };

  // 动态更新输入框的提示信息
  const getPricePlaceholder = () => {
    if (listingType === '出售') {
      return '请输入总价（单位：万元）';
    }
    return '请输入月租（单位：元）';
  };

  // 格式化价格显示
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `${(price / 10000).toFixed(2)} 万元`;
    }
    return `${price} 元`;
  };

  const columns = [
    { title: '房产ID', dataIndex: 'id', key: 'id' },
    { title: '位置', dataIndex: 'location', key: 'location' },
    { title: '面积', dataIndex: 'area', key: 'area' },
    { title: '户型', dataIndex: 'houseType', key: 'houseType' },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" onClick={() => showListingModal(record)}>
          挂牌
        </Button>
      ),
    },
  ];

  return (
    <div id="my-properties">
      <h2>我的房产</h2>
      <Table
        dataSource={properties.map((property) => ({
          ...property,
          price: formatPrice(property.price), // 格式化价格
        }))}
        columns={columns}
        rowKey="id"
      />

      {/* 挂牌对话框 */}
      <Modal
        title="挂牌房源"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleListing}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="listingType"
            label="选择挂牌类型"
            rules={[{ required: true, message: '请选择挂牌类型' }]}
          >
            <Radio.Group onChange={(e) => setListingType(e.target.value)}>
              <Radio value="出售">出售</Radio>
              <Radio value="出租">出租</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="price"
            label={getPricePlaceholder()}
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <Input type="number" placeholder={getPricePlaceholder()} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyProperties;


