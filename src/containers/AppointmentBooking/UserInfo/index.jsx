import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './UserInfo.module.scss';

const UserInfo = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('User Info Submitted:', values);
  };

  return (
    <>
      <h2 className={styles.title}>STEP 1: Enter Your Information</h2>
      <Form
        form={form}
        name="user-info"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
        className={styles.formitem}
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
        className={styles.formitem}
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

      </Form>
    </>
  );
};

export default UserInfo;
