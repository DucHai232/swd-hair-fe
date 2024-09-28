import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import IntroComponent from "../../components/HomePageBody/IntroComponent/index";
import Services from "../../components/HomePageBody/Services/index";
import Trending from "../../components/HomePageBody/Trending/index";
import Stylist from "../../components/HomePageBody/Stylist/index";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation()
  console.log(location)
  if (location?.state?.requestedPath != location?.pathname) {
    if (location?.state?.rejectAccess) {
      alert('reject access')
    }
    else {
      alert('invalid URL')
    }
  }
  return (
    <>
      <Header />
      <IntroComponent />
      <Services />
      <Trending />
      <Stylist />
      <div style={{ backgroundColor: "blue", margin: "20px", height: "50px" }}>
        Không gian quán
      </div>
      <div style={{ backgroundColor: "blue", margin: "20px", height: "50px" }}>
        feed back
      </div>
      <div style={{ backgroundColor: "blue", margin: "20px", height: "50px" }}>
        cam kết và tóm tắt chính sách
      </div>
      <div style={{ backgroundColor: "blue", margin: "20px", height: "50px" }}>
        tin tức
      </div>
      <div style={{ backgroundColor: "blue", margin: "20px", height: "50px" }}>
        đối tác
      </div>
      <Footer />
    </>
  );
};

export default Home;
