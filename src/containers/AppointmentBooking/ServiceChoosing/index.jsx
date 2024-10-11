import { Button, Table } from 'antd'
import React from 'react'
import { setOpenServiceModal } from '../../../feature/appointment'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ServiceChoosing.module.scss';

const ServiceChoosing = () => {
  const dispatch = useDispatch()
  const openModal = useSelector((state) => state.appointment.openServiceModal)
  const selectedServices = useSelector((state) => state.appointment.selectedService)
  const totalPrice = useSelector((state) => state.appointment.totalPrice)

  const handleOpenModal = async () => {
    await dispatch(setOpenServiceModal(!openModal))
  }

  // Columns definition for Ant Design Table
  const columns = [
    {
      title: 'Service Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`, // Format price with $
    },
  ];

  // Convert selectedServices to table data format
  const dataSource = selectedServices.map((service, index) => ({
    key: index,
    name: service.name,
    price: service.price,
  }));

  return (
    <>
      <div className={styles.header}>
        STEP 2: Choose Your Service
      </div>
      <Button className={styles.chooseServicebtn} type="primary" onClick={handleOpenModal}>
        Choose a Service
      </Button>

      {selectedServices.length > 0 ? (
        <Table
          className={styles.serviceTable}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      ) : (
        <div className={styles.noServiceMessage}>
          No service selected yet.
        </div>
      )}

      <div className={styles.totalPrice}>
        {totalPrice !== 0 && totalPrice && `Total price: $${totalPrice}`}
      </div>
    </>
  )
}

export default ServiceChoosing;
