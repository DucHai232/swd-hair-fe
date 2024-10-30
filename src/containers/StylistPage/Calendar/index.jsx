import React from 'react';
import { Badge, Calendar } from 'antd';
import moment from 'moment';
import { useScheduleStylistQuery } from "../../../services/hairsalon.service";

const StylistCalendar = () => {
  const { data: schedule, isLoading } = useScheduleStylistQuery();

  const dateCellRender = (value) => {
    // Filter schedule data for appointments matching the current date
    const listData = schedule?.data.filter((item) => 
      moment(item.appointmentDate).isSame(value, 'day')
    );

    return (
      <ul className="events">
        {listData?.map((item) => (
          <li key={item.appointmentName}>
            <Badge
              status={item.status === "Completed" ? "success" : "warning"}
              text={`${item.appointmentName} at ${item.appointmentTime}`}
            />
          </li>
        ))}
      </ul>
    );
  };

  const monthCellRender = (value) => {
    // Optionally implement month view logic here, if needed
    return null;
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <Calendar 
      cellRender={cellRender} 
      loading={isLoading} 
    />
  );
};

export default StylistCalendar;
