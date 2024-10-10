import { Select, Button, Typography, message, Col, Row } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import styles from "./DateTimeChoosing.module.scss";
import { generateNext7Days } from "../../../utils/util";
import { useEffect, useState } from "react";
import { getAvailableTimeSlots } from "../../../services/schedule.service";

const { Option } = Select;

const DateTimeChoosing = ({ formBooking, setFormBooking }) => {
  const { selectedStylist, selectedSlot, selectedDay } = formBooking;
  const [dataSchedule, setDataSchedule] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const next7Days = generateNext7Days();
  // const timeSlots = [
  //   [
  //     { time: "8h00", available: true },
  //     { time: "8h20", available: true },
  //     { time: "8h40", available: true },
  //   ],
  //   [
  //     { time: "9h00", available: false },
  //     { time: "9h20", available: true },
  //     { time: "9h40", available: true },
  //   ],
  //   [
  //     { time: "10h00", available: false },
  //     { time: "10h20", available: false },
  //     { time: "10h40", available: false },
  //   ],
  //   [
  //     { time: "11h00", available: true },
  //     { time: "11h20", available: false },
  //     { time: "11h40", available: false },
  //   ],
  //   [
  //     { time: "12h00", available: true },
  //     { time: "12h20", available: false },
  //     { time: "12h40", available: false },
  //   ],
  //   [
  //     { time: "13h00", available: false },
  //     { time: "13h20", available: true },
  //     { time: "13h40", available: false },
  //   ],
  //   [
  //     { time: "14h00", available: true },
  //     { time: "14h20", available: true },
  //     { time: "14h40", available: false },
  //   ],
  //   [
  //     { time: "15h00", available: false },
  //     { time: "15h20", available: false },
  //     { time: "15h40", available: false },
  //   ],
  //   [
  //     { time: "16h00", available: true },
  //     { time: "16h20", available: false },
  //     { time: "16h40", available: false },
  //   ],
  //   [
  //     { time: "17h00", available: false },
  //     { time: "17h20", available: true },
  //     { time: "17h40", available: true },
  //   ],
  //   [
  //     { time: "18h00", available: true },
  //     { time: "18h20", available: false },
  //     { time: "18h40", available: true },
  //   ],
  //   [
  //     { time: "19h00", available: true },
  //     { time: "19h20", available: true },
  //     { time: "19h40", available: true },
  //   ],
  //   [
  //     { time: "20h00", available: true },
  //     { time: "20h20", available: false },
  //     { time: "20h40", available: false },
  //   ],
  // ];
  const handleDayChange = (value) => {
    setFormBooking((prev) => ({
      ...prev,
      selectedDay: value,
    }));
  };
  const handleTimeSelect = (time) => {
    setFormBooking((prev) => ({
      ...prev,
      selectedSlot: time,
    }));
  };
  const loadScheduleOfStylist = async () => {
    try {
      const payload = {
        stylistId: selectedStylist?._id,
        startDate: next7Days?.[0],
        endDate: next7Days?.[6],
      };
      const response = await getAvailableTimeSlots(payload);
      setDataSchedule(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const loadTimeSlots = () => {
    const getTimesSlot = dataSchedule.filter(
      (slot) => slot.date === selectedDay
    )[0]?.timeSlots;
    setTimeSlots(getTimesSlot);
  };
  useEffect(() => {
    loadScheduleOfStylist();
  }, [selectedStylist]);
  useEffect(() => {
    loadTimeSlots();
  }, [selectedDay]);
  return (
    <div className={styles.dateSelectContainer}>
      <Typography.Title level={4}>
        STEP 4: Choose a day & time:
      </Typography.Title>
      <Select
        id="day-select"
        value={formBooking.selectedDay ? formBooking.selectedDay : null}
        onChange={handleDayChange}
        placeholder="Select a day"
        className={styles.select}
      >
        {next7Days.map((day) => (
          <Option key={day} value={day}>
            {new Date(day).toLocaleDateString()}
          </Option>
        ))}
      </Select>

      <Swiper
        slidesPerView={6}
        navigation
        pagination={{ clickable: true }}
        className={styles.swiperContainer}
      >
        <Row>
          {timeSlots?.map((hour, index) => (
            <Col key={index} span={4}>
              <Button
                key={index}
                className={`${styles.timeItem} ${
                  selectedSlot === hour.time
                    ? styles.selected
                    : styles.available
                }`}
                disabled={!hour.available}
                onClick={() => hour.available && handleTimeSelect(hour.time)}
              >
                {hour.time}
              </Button>
            </Col>
          ))}
        </Row>
      </Swiper>
    </div>
  );
};

export default DateTimeChoosing;
