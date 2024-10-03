import { Button } from 'antd'
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
  return (
    <>
      <div className={styles.totalPrice}>
        STEP 2: Choose Your Service
      </div>
      <Button className={styles.chooseServicebtn} type="primary" onClick={handleOpenModal}>
        Choose a Service
      </Button>
      {/* chuyển thành bảng */}
      <div className={styles.totalPrice}>
        {selectedServices.length != 0 && `Selected Service: ${selectedServices.map((service) => `${service?.name}, `)}`}
      </div>
      <div className={styles.totalPrice}>
        {totalPrice != 0 && totalPrice && `Total price: ${totalPrice}`}
      </div></>
  )
}

export default ServiceChoosing