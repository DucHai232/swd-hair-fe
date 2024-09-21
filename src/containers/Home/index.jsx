import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import { Button } from "antd";

const Home = () => {
  return (
    <>
      <Header />
      <div style={{ backgroundColor: "yellow", height: "75px" }}>
        <Button>Female</Button>
        <Button>Male</Button>
      </div>
      <div style={{ backgroundColor: "red", height: "424px" }}>
        Giới thiệu trang
      </div>
      <div style={{ backgroundColor: "blue", margin: "20px", height: "424px" }}>
        Dịch vụ tóc
      </div>
      <div
        style={{ backgroundColor: "green", margin: "20px", height: "424px" }}
      >
        Trending style
      </div>
      <div style={{ backgroundColor: "blue", margin: "20px", height: "424px" }}>
        Top stylist
      </div>
      <div style={{ backgroundColor: "blue", margin: "20px", height: "424px" }}>
        Không gian quán
      </div>
      <div style={{ backgroundColor: "blue", margin: "20px", height: "424px" }}>
        feed back
      </div>
      <div style={{ backgroundColor: "blue", margin: "20px", height: "424px" }}>
        cam kết và tóm tắt chính sách
      </div>
      <div style={{ backgroundColor: "blue", margin: "20px", height: "424px" }}>
        tin tức
      </div>
      <div style={{ backgroundColor: "blue", margin: "20px", height: "424px" }}>
        đối tác
      </div>
      <Footer />
    </>
  );
};

export default Home;
