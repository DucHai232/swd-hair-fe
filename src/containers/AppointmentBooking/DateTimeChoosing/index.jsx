import { useState } from 'react';
import { Select, Button } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import styles from './DateTimeChoosing.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDay, setSelectedSlot } from '../../../feature/appointment';

const { Option } = Select;

const DateTimeChoosing = () => {
  const dispatch = useDispatch()
  // const [selectedDay, setSelectedDay] = useState('2024-10-01');
  // const [selectedTime, setSelectedTime] = useState(null);
  const selectedDay = useSelector((state) => state.appointment.selectedDay)
  const selectedSlot = useSelector((state) => state.appointment.selectedSlot)

  const timeSlots = [
    [{ time: '8h00', available: true }, { time: '8h20', available: true }, { time: '8h40', available: true }],
    [{ time: '9h00', available: false }, { time: '9h20', available: true }, { time: '9h40', available: true }],
    [{ time: '10h00', available: false }, { time: '10h20', available: false }, { time: '10h40', available: false }],
    [{ time: '11h00', available: true }, { time: '11h20', available: false }, { time: '11h40', available: false }],
    [{ time: '12h00', available: true }, { time: '12h20', available: false }, { time: '12h40', available: false }],
    [{ time: '13h00', available: false }, { time: '13h20', available: false }, { time: '13h40', available: false }],
    [{ time: '14h00', available: false }, { time: '14h20', available: false }, { time: '14h40', available: false }]
  ];

  const handleDayChange = (value) => {
    dispatch(setSelectedDay(value))
  };

  const handleTimeSelect = (time) => {
    dispatch(setSelectedSlot(time))
  };

  return (
    <div className={styles.dateSelectContainer}>
      <label htmlFor="day-select" className={styles.label}>STEP 4: Choose a day & time:</label>
      <Select
        id="day-select"
        value={selectedDay}
        onChange={handleDayChange}
        placeholder="Select a day"
        className={styles.select}
      >
        <Option value="2024-10-01">October 1, 2024</Option>
        <Option value="2024-10-02">October 2, 2024</Option>
        <Option value="2024-10-03">October 3, 2024</Option>
        {/* Add more options here */}
      </Select>

      <Swiper
        slidesPerView={6}
        navigation
        pagination={{ clickable: true }}
        className={styles.swiperContainer}
      >
        {timeSlots.map((hour, index) => (
          <SwiperSlide key={index} className={styles.swiperColumn}>
            {hour.map((slot, index) => (
              <Button
              key={index}
                className={`${styles.timeItem} ${selectedSlot == slot.time ? styles.selected : styles.available}`}
                disabled={!slot.available}
                onClick={() => slot.available && handleTimeSelect(slot.time)}
              >
                {slot.time}
              </Button>))}
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedSlot && <p className={styles.selectedTime}>Selected time: {selectedSlot}</p>}
    </div>
  );
};
  
export default DateTimeChoosing;
