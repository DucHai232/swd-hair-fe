import styles from './Stylist.module.scss'; // Import SCSS module
import { Carousel } from 'antd';

// Sample stylist data
const stylists = [
  {
    _id: "66e657812287bd197205262a",
    username: "sl1",
    name: "stylist 1",
    email: "sl1@gmail.com",
    role: ["stylist"],
    salary: 0,
    commissionRate: 0,
    totalSalry: 0,
    banned: false,
    image: "https://www.1900hairsalon.com/wp-content/uploads/2023/11/uon-toc.jpg",
    createdAt: "2024-09-15T03:41:53.661Z",
    updatedAt: "2024-09-17T03:23:17.538Z",
    favoriteStylists: ["66e7a7056d6b95b778156f1f"],
  },
  {
    _id: "66e7a7056d6b95b778156f1f",
    username: "st2",
    name: "Stylist 2",
    email: "st2@gmail.com",
    role: ["stylist"],
    salary: 0,
    commissionRate: 0,
    totalSalry: 0,
    favoriteStylists: [],
    banned: false,
    image: "https://www.1900hairsalon.com/wp-content/uploads/2023/11/uon-toc.jpg",
    createdAt: "2024-09-16T03:33:25.216Z",
    updatedAt: "2024-09-16T03:33:25.216Z",
  },
  {
    _id: "66e7a7056d6b95b778156f1f",
    username: "st2",
    name: "Stylist 2",
    email: "st2@gmail.com",
    role: ["stylist"],
    salary: 0,
    commissionRate: 0,
    totalSalry: 0,
    favoriteStylists: [],
    banned: false,
    image: "https://www.1900hairsalon.com/wp-content/uploads/2023/11/uon-toc.jpg",
    createdAt: "2024-09-16T03:33:25.216Z",
    updatedAt: "2024-09-16T03:33:25.216Z",
  },
  {
    _id: "66e7a7056d6b95b778156f1f",
    username: "st2",
    name: "Stylist 2",
    email: "st2@gmail.com",
    role: ["stylist"],
    salary: 0,
    commissionRate: 0,
    totalSalry: 0,
    favoriteStylists: [],
    banned: false,
    image: "https://www.1900hairsalon.com/wp-content/uploads/2023/11/uon-toc.jpg",
    createdAt: "2024-09-16T03:33:25.216Z",
    updatedAt: "2024-09-16T03:33:25.216Z",
  }
];

const StylistSlider = () => {
  return (
    <div className={styles.stylistSlider}>
      <h2>Our Stylists</h2>
      <Carousel autoplay slidesPerRow={4} dots={true} arrows={true} speed={3000}>
        {stylists.map((stylist) => (
          <div key={stylist._id} className={styles.stylistCard}>
            <img src={stylist.image} alt={stylist.name} className={styles.stylistImage} />
            <h3>{stylist.name}</h3>
            <p>Email: {stylist.email}</p>
            <p>Username: {stylist.username}</p>
            <p>Banned: {stylist.banned ? "Yes" : "No"}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default StylistSlider;
