import React, { useEffect, useState } from 'react';
import { Input, Button, Timeline, Form, DatePicker } from 'antd';
import Header from '../../components/Header';
import styles from './AppointmentBooking.module.scss'; // Import SCSS module
import Footer from '../../components/Footer';
import ChooseService from './ChooseService';

const AppointmentBooking = () => {
  const [openModal, setOpenModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [form] = Form.useForm();

  const handleBooking = (values) => {
    const { name, service, date } = values;
    const formattedDate = date.format('YYYY-MM-DD');
    setAppointments([...appointments, `${name} booked ${service} on ${formattedDate}`]);
    form.resetFields();
  };

  const handleOpenModal = async() => {
    await setOpenModal(!openModal);
    
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.heading}>Book an Appointment</h2>
        <Form form={form} onFinish={handleBooking} layout="inline" className={styles.form}>
          <Timeline
            className={styles.timeline}
            items={[
              {
                children: <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input placeholder="Your Name" />
                </Form.Item>,
              },
              {
                children: 
                <>
                  <Button type="primary" onClick={handleOpenModal}>
                    Choose a Service
                  </Button>
                  
                </>
              },
              {
                children: <Form.Item
                  name="date"
                  rules={[{ required: true, message: 'Please choose a date' }]}
                >
                  <DatePicker placeholder="Select Date" />
                </Form.Item>,
              },
              {
                children: <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Book Appointment
                  </Button>
                </Form.Item>,
              },
            ]}
          />
        </Form>
      </div>
      <Footer />
      {  console.log("openModal", openModal)}
      <ChooseService props={openModal}/>
    </>
  );
};

export default AppointmentBooking;
