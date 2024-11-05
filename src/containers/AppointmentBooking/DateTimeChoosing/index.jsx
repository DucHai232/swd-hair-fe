import { Select, Button, Typography, Col, Row } from "antd";
import { Swiper } from "swiper/react";
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
  const handleDayChange = (value) => {
    setFormBooking((prev) => ({
      ...prev,
      selectedDay: value,
    }));
  };
  const handleSlotSelect = (time) => {
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
    console.log(timeSlots);
  };
  useEffect(() => {
    const loadStylistSchedule = async () => {
      await loadScheduleOfStylist();
      await loadTimeSlots();
    };
    loadStylistSchedule();
  }, [selectedDay, selectedStylist]);
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

      <Row>
        {timeSlots?.map((hour, index) => (
          <Col key={index} span={4}>
            <Button
              key={index}
              className={`${styles.timeItem} ${
                selectedSlot === hour.time ? styles.selected : styles.available
              }`}
              disabled={!hour.available}
              onClick={() => hour.available && handleSlotSelect(hour.time)}
            >
              {hour.time}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DateTimeChoosing;
