import { Modal, Card, Row, Col, Button, message } from "antd";
import styles from "./ServiceModal.module.scss";
import { getServices } from "../../../services/service.service";
import { useEffect, useState } from "react";
import { signout } from "../../../feature/authentication";
import { useDispatch } from "react-redux";

// Sample data for services with prices

function ServiceModal({
  selectedServices,
  openModal,
  setOpenModal,
  handleChooseServices,
}) {
  const dispatch = useDispatch();
  const [dataServices, setDataServices] = useState([]);
  const loadServices = async () => {
    try {
      const response = await getServices();
      setDataServices(response?.data?.services);
    } catch (error) {
      dispatch(signout());
      console.log(error);
    }
  };
  const toggleSelectService = (service) => {
    const isSelected = selectedServices?.some(
      (selected) => selected._id === service._id
    );
    let updatedServices;
    if (isSelected) {
      updatedServices = selectedServices?.filter(
        (selected) => selected._id !== service._id
      );
    } else {
      updatedServices = [...selectedServices, service];
    }
    handleChooseServices(updatedServices);
  };
  const handleConfirmChooseService = () => {
    if (selectedServices.length === 0) {
      message.warning("Bạn chưa chọn dịch vụ nào!");
      return;
    }
    setOpenModal(false);
  };
  useEffect(() => {
    loadServices();
  }, []);
  return (
    <>
      <Modal
        title="Choose a Service"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        width={1000}
      >
        <Row gutter={[16, 16]}>
          {dataServices.map((service) => (
            <Col span={6} key={service._id}>
              <div className={styles.cardContainer}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={service.name}
                      src={service.image}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  }
                  onClick={() => toggleSelectService(service)}
                  className={`${
                    selectedServices?.some(
                      (selected) => selected._id === service._id
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
          Xác nhận lựa chọn
        </Button>
      </Modal>
    </>
  );
}

export default ServiceModal;
