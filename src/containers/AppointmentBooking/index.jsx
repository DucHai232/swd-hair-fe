import { Input, Button, Timeline, Form, DatePicker } from 'antd';
import Header from '../../components/Header';
import styles from './AppointmentBooking.module.scss'; // Import SCSS module
import Footer from '../../components/Footer';
import ServiceModal from './ServiceModal';
import ServiceChoosing from './ServiceChoosing';
import StylistChoosing from './StylistChoosing';
import DateTimeChoosing from './DateTimeChoosing';
import { useSelector } from 'react-redux';
import UserInfo from './UserInfo';

const AppointmentBooking = () => {
  // const [appointments, setAppointments] = useState([]);
  const [form] = Form.useForm();
  const selectedService = useSelector((state) => state.appointment.selectedService)
  const selectedStylist = useSelector((state) => state.appointment.selectedStylist)
  const selectedTime = useSelector((state) => state.appointment.selectedTime)
  // const dispatch = useDispatch()

  const handleBooking = (values) => {
    // const { name, service, date } = values;
    // const formattedDate = date.format('YYYY-MM-DD');
    // setAppointments([...appointments, `${name} booked ${service} on ${formattedDate}`]);
    form.resetFields();
  };

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
                children: <UserInfo/>,
              },
              {
                color: 'blue',
                children: <ServiceChoosing/>
              },
              {
                color: 'blue',
                children: <StylistChoosing/>,
              },
              {
                color: 'blue',
                children: <DateTimeChoosing/>,
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
      <ServiceModal />
    </>
  );
};

export default AppointmentBooking;
