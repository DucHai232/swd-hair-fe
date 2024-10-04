import { useState } from 'react';
import { Modal, Input, Card, Row, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenServiceModal, setSelectedService, setTotalPrice } from '../../../feature/appointment';
import styles from './ServiceModal.module.scss'

// Sample data for services with prices
const services = [
  { id: 1, name: 'Haircut', price: 20, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Shampoo', price: 10, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Coloring', price: 50, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Styling', price: 30, image: 'https://via.placeholder.com/150' },
];

function ServiceModal() {
  const [searchTerm, setSearchTerm] = useState('');
  const selectedServices = useSelector((state) => state.appointment.selectedService);
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.appointment.openServiceModal);

  // Filter services based on search term
  const filteredServices = services.filter(service => service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle service selection
  const toggleSelectService = (service) => {
    const isSelected = selectedServices.some(selected => selected.id === service.id);
    let updatedServices;
    if (isSelected) {
      updatedServices = selectedServices.filter(selected => selected.id !== service.id);
    } else {
      updatedServices = [...selectedServices, service];
    }
    dispatch(setSelectedService(updatedServices)); // Dispatch selected services to Redux store
  };

  // Calculate total price
  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);

  // Close Modal
  const handleCancel = async () => {
    await dispatch(setOpenServiceModal(false));
    await dispatch(setTotalPrice(totalPrice));
  };

  return (
    <>
      <Modal
        title="Choose a Service"
        open={openModal}
        onCancel={handleCancel}
        footer={null}
        width={800} // Set a custom width for a better layout
      >
        {/* Search Input */}
        <Input
          placeholder="Search services"
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px' }} />

        {/* Display List of Services */}
        <Row gutter={[16, 16]}>
          {filteredServices.map((service) => (
            <Col span={6} key={service.id}>
              <div className={styles.cardContainer}>
                <Card
                  hoverable
                  cover={<img alt={service.name} src={service.image} />}
                  onClick={() => toggleSelectService(service)}
                  className={`${selectedServices.some(selected => selected.id === service.id) ? styles.selected : ''}`}
                >
                  <Card.Meta
                    title={service.name}
                    description={`$${service.price}`} />
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        {/* Total Price */}
        <div className={styles.totalPrice}>
          Total: ${totalPrice}
        </div>

        {/* Selected service */}
        {/* {selectedServices.map((service) => (<div className={styles.totalPrice} key={service.id}>
              Selected Service: ${selectedServices?.name}
            </div>))} */}
        <div className={styles.totalPrice}>
          Selected Service: {selectedServices.map((service) => `${service?.name}, `)}
        </div>

        {/* Confirm Selection Button */}
        <Button
          type="primary"
          className={styles.button}
          onClick={handleCancel} // You can also add further actions here
        >
          Confirm Selection
        </Button>
      </Modal>
    </>
  );
}

export default ServiceModal;
