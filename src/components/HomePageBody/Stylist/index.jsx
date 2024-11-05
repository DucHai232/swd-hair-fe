import { useEffect, useState } from "react";
import styles from "./Stylist.module.scss"; // Import SCSS module
import { Carousel, Spin } from "antd";
import { getAllStylists } from "../../../services/stylist.service";

const StylistSlider = () => {
  const [stylists, setStylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadStylists = async () => {
    try {
      setIsLoading(true);
      const response = await getAllStylists();
      setStylists(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    dotPosition: "bottom",
  };

  useEffect(() => {
    loadStylists();
  }, []);

  return (
    <div className={styles.stylistSlider}>
      <h2>Our Stylists</h2>
      <Spin spinning={isLoading}>
        <Carousel {...settings}>
          {stylists.map((stylist) => (
            <div key={stylist._id} className={styles.stylistCard}>
              <img
                src={stylist.avatar}
                alt={stylist.name}
                className={styles.stylistImage}
              />
              <h3>{stylist.name}</h3>
              <p>Email: {stylist.email}</p>
              <p>Dịch vụ đã làm: {stylist.numberAppointments}</p>
              <p>Kinh nghiệm: {stylist.numberExperiences}</p>
              <p>Chuyên môn: {stylist.expertise}</p>
            </div>
          ))}
        </Carousel>
      </Spin>
    </div>
  );
};

export default StylistSlider;
