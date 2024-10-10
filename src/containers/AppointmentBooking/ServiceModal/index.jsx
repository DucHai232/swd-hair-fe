import { Modal, Card, Row, Col, Button, message } from "antd";
import styles from "./ServiceModal.module.scss";

// Sample data for services with prices
const services = [
  {
    id: 1,
    name: "Haircut",
    price: 20,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Shampoo",
    price: 10,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Coloring",
    price: 50,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Styling",
    price: 30,
    image: "https://via.placeholder.com/150",
  },
];

function ServiceModal({
  selectedServices,
  openModal,
  setOpenModal,
  handleChooseServices,
}) {
  const toggleSelectService = (service) => {
    const isSelected = selectedServices?.some(
      (selected) => selected.id === service.id
    );
    let updatedServices;
    if (isSelected) {
      updatedServices = selectedServices?.filter(
        (selected) => selected.id !== service.id
      );
    } else {
      updatedServices = [...selectedServices, service];
    }
    handleChooseServices(updatedServices);
  };

  const handleConfirmChooseService = () => {
    if (selectedServices.length === 0) {
      message.warning("Bạn chưa chọn dịch vụ nào");
      return;
    }
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        title="Choose a Service"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={800}
      >
        <Row gutter={[16, 16]}>
          {services.map((service) => (
            <Col span={6} key={service.id}>
              <div className={styles.cardContainer}>
                <Card
                  hoverable
                  cover={<img alt={service.name} src={service.image} />}
                  onClick={() => toggleSelectService(service)}
                  className={`${
                    selectedServices?.some(
                      (selected) => selected.id === service.id
                    )
                      ? styles.selected
                      : ""
                  }`}
                >
                  <Card.Meta
                    title={service.name}
                    description={`$${service.price}`}
                  />
                </Card>
              </div>
            </Col>
          ))}
        </Row>

        <Button
          type="primary"
          className={styles.button}
          onClick={handleConfirmChooseService}
        >
          Confirm Selection
        </Button>
      </Modal>
    </>
  );
}

export default ServiceModal;
