import { useEffect, useState } from 'react';
import { Modal, Input, Card, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Sample data for services
const services = [
  { id: 1, name: 'Haircut', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Shampoo', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Coloring', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Styling', image: 'https://via.placeholder.com/150' },
];

const ChooseService = ({ props }) => {
  const [visible, setVisible] = useState(props);
  const [searchTerm, setSearchTerm] = useState('');
  console.log("visible" ,props)
  // Filter services based on search term
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close Modal
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        title="Choose a Service"
        open={visible}
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
          style={{ marginBottom: '20px' }}
        />

        {/* Display List of Services */}
        <Row gutter={[16, 16]}>
          {filteredServices.map((service) => (
            <Col span={6} key={service.id}>
              <Card
                hoverable
                cover={<img alt={service.name} src={service.image} />}
              >
                <Card.Meta title={service.name} />
              </Card>
            </Col>
          ))}
        </Row>
      </Modal>
    </>
  );
};

export default ChooseService;
