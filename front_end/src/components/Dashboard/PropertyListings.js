// src/components/Dashboard/PropertyListings.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Tag, Modal, Input, Form } from 'antd';
import propertyService from '../../services/propertyService';

const PropertyListings = () => {
  const [listings, setListings] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null); // 当前选择的房产
  const [isForRent, setIsForRent] = useState(false); // 标识操作是租赁还是购买
  const [rentDuration, setRentDuration] = useState(''); // 租赁时长

  useEffect(() => {
    async function fetchListings() {
      const data = await propertyService.getAllListings();
      setListings(data);
    }
    fetchListings();
  }, []);

  // 打开确认对话框
  const showConfirmModal = (property, isForRent) => {
    setSelectedProperty(property);
    setIsForRent(isForRent);
    setIsModalVisible(true);
  };

  // 确认操作
  const handleConfirm = () => {
    if (isForRent) {
      // 处理租赁操作
      console.log(`租赁房产: ${selectedProperty.id}, 租赁时长: ${rentDuration} 月`);
    } else {
      // 处理购买操作
      console.log(`购买房产: ${selectedProperty.id}`);
    }

    // 关闭对话框
    setIsModalVisible(false);
    setRentDuration(''); // 重置租赁时长
  };

  // 关闭对话框
  const handleCancel = () => {
    setIsModalVisible(false);
    setRentDuration(''); // 重置租赁时长
  };

  const columns = [
    {
      title: '房产ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '面积',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: '户型',
      dataIndex: 'houseType',
      key: 'houseType',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price) =>
        price >= 1000000 ? `${(price / 10000).toFixed(2)} 万元` : `${price} 元`,
    },
    {
      title: '类型',
      dataIndex: 'isForRent',
      key: 'isForRent',
      render: (isForRent) => (
        <Tag color={isForRent ? 'green' : 'blue'}>
          {isForRent ? '出租' : '出售'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => showConfirmModal(record, record.isForRent)}
        >
          {record.isForRent ? '租赁' : '购买'}
        </Button>
      ),
    },
  ];

  return (
    <div id="property-listings">
      <h2>房源列表</h2>
      <Table dataSource={listings} columns={columns} rowKey="id" />

      {/* 弹出对话框 */}
      <Modal
        title={isForRent ? '确认租赁' : '确认购买'}
        visible={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText={isForRent ? '确认租赁' : '确认购买'}
        cancelText="取消"
      >
        {isForRent ? (
          <Form layout="vertical">
            <Form.Item label="租赁时长（月）" required>
              <Input
                type="number"
                placeholder="请输入租赁时长"
                value={rentDuration}
                onChange={(e) => setRentDuration(e.target.value)}
              />
            </Form.Item>
          </Form>
        ) : (
          <p>确认购买房产 {selectedProperty && selectedProperty.id} 吗？</p>
        )}
      </Modal>
    </div>
  );
};

export default PropertyListings;
