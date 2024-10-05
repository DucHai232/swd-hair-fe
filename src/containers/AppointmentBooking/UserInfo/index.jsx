import React from 'react';
import { Input } from 'antd';
import styles from './UserInfo.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomerName } from '../../../feature/appointment';
import { setCustomerPhone } from '../../../feature/appointment';

const UserInfo = () => {
  const dispatch = useDispatch()
  const customerName = useSelector((state) => state.appointment.customerName)
  const customerPhone = useSelector((state) => state.appointment.customerPhone)
  const submitName = (e) => {
    console.log(e)
    dispatch(setCustomerName(e.target.value))
  }
  const submitPhone = (e) => {
    dispatch(setCustomerPhone(e.target.value))
  }

  return (
    <>
      <h2 className={styles.title}>STEP 1: Enter Your Information</h2>
      <p className={styles.label}>Name: </p>
      <Input className={styles.formitem} value={customerName} onChange={submitName} placeholder="Enter your name" />
      <p className={styles.label}>Phone Number: </p>
      <Input className={styles.formitem} value={customerPhone} type='number' inputmode="numeric" onChange={submitPhone} placeholder="Enter your phone number"/>
    </>
  );
};

export default UserInfo;
