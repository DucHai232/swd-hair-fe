import { useState } from 'react';
import { Card, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedStylist } from '../../../feature/appointment'; // Assuming you have a Redux action
import styles from './StylistChoosing.module.scss';

const stylists = [
  { id: 1, name: 'Stylist A', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Stylist B', imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Stylist C', imageUrl: 'https://via.placeholder.com/150' },
];

const StylistChoosing = () => {
  const dispatch = useDispatch();
  const selectedStylist = useSelector((state) => state.appointment.selectedStylist);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter stylists based on search term
  const filteredStylists = stylists.filter((stylist) =>
    stylist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle stylist selection
  const handleSelectStylist = (stylist) => {
    dispatch(setSelectedStylist(stylist));
  };

  return (
    <>
    <div className={styles.title}>
        STEP 3: Choose Your Stylist
    </div>
      {/* Display list of stylists */}
      <Row gutter={[16, 16]}>
        {filteredStylists.map((stylist) => (
          <Col span={6} key={stylist.id}>
            <div className={`${selectedStylist?.id === stylist.id ? styles.selected : ''}`}>
              <Card
                hoverable
                cover={<img alt={stylist.name} src={stylist.imageUrl} />}
                onClick={() => handleSelectStylist(stylist)}
                
              >
                <Card.Meta
                  title={stylist.name}
                  description="Click to choose"
                />
              </Card>
            </div>
          </Col>
        ))}
      </Row>

      {/* Display selected stylist */}
      <div className={styles.selectedStylist}>
        {selectedStylist ? `Selected Stylist: ${selectedStylist.name}` : 'No stylist selected'}
      </div>
    </>
  );
};

export default StylistChoosing;
