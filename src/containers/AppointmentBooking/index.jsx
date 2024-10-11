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
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, ScissorOutlined, UserOutlined } from '@ant-design/icons';

const AppointmentBooking = () => {
  // const [appointments, setAppointments] = useState([]);
  const [form] = Form.useForm();
  const customerName = useSelector((state) => state.appointment.customerName)
  const customerPhone = useSelector((state) => state.appointment.customerPhone)
  const selectedService = useSelector((state) => state.appointment.selectedService)
  const selectedStylist = useSelector((state) => state.appointment.selectedStylist)
  const selectedDay = useSelector((state) => state.appointment.selectedDay)
  const selectedSlot = useSelector((state) => state.appointment.selectedSlot)
  // const dispatch = useDispatch()

  const handleBooking = (values) => {
    // const { name, service, date } = values;
    // const formattedDate = date.format('YYYY-MM-DD');
    // setAppointments([...appointments, `${name} booked ${service} on ${formattedDate}`]);
    form.resetFields();
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.heading}>Book an Appointment</h2>
        <Form form={form} onFinish={handleBooking} layout="inline" className={styles.form}>
          <Timeline
            className={styles.timeline}
            items={[
              {
                color: customerName == '' || customerPhone == '' ? 'red' : 'green',
                dot: customerName == '' || customerPhone == '' ? <ExclamationCircleOutlined style={{ fontSize: '16px' }} /> : <CheckCircleOutlined style={{ fontSize: '16px' }} />,
                children: <UserInfo/>,
              },
              {
                color: selectedService == '' ? 'red' : 'green',
                dot: selectedService == '' ? <ExclamationCircleOutlined style={{ fontSize: '16px' }} /> : <ScissorOutlined style={{ fontSize: '16px' }} />,
                children: <ServiceChoosing/>
              },
              {
                color: selectedStylist == '' ? 'red' : 'green',
                dot: selectedStylist == '' ? <ExclamationCircleOutlined style={{ fontSize: '16px' }} /> : <UserOutlined style={{ fontSize: '16px' }} />,
                children: <StylistChoosing/>,
              },
              {
                color: selectedSlot == '' ? 'red' : 'green',
                dot: selectedSlot == '' ? <ExclamationCircleOutlined style={{ fontSize: '16px' }} /> : <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                children: <DateTimeChoosing/>,
              },
              {
                dot: <CalendarOutlined style={{ fontSize: '16px' }} />,
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
      <ServiceModal />
    </>
  );
};

export default AppointmentBooking;
