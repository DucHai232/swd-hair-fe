import { useEffect, useState } from "react";
import styles from "./Stylist.module.scss";
import { Carousel, Spin } from "antd";
import { getAllStylists } from "../../../services/stylist.service";

const StylistSlider = () => {
  const [stylists, setStylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadStylists = async () => {
    setIsLoading(true);
    try {
      const { data } = await getAllStylists();
      setStylists(data);
    } catch (error) {
      console.error("Error fetching stylists:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStylists();
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    dotPosition: "bottom",
  };

  return (
    <div className={styles.stylistSlider}>
      <h2>THỢ CẮT CỦA CHÚNG TÔI</h2>
      <Spin spinning={isLoading}>
        <Carousel {...carouselSettings}>
          {stylists.map(
            ({
              _id,
              avatar,
              name,
              email,
              numberAppointments,
              numberExperiences,
              expertise,
            }) => (
              <div key={_id} className={styles.stylistCard}>
                <img src={avatar} alt={name} className={styles.stylistImage} />
                <h3>{name}</h3>
                <p>Email: {email}</p>
                <p>Dịch vụ đã làm: {numberAppointments}</p>
                <p>Kinh nghiệm: {numberExperiences}</p>
                <p>Chuyên môn: {expertise}</p>
              </div>
            )
          )}
        </Carousel>
      </Spin>
    </div>
  );
};

export default StylistSlider;
