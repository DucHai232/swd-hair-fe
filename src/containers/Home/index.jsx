import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import IntroComponent from "../../components/HomePageBody/IntroComponent/index";
import Services from "../../components/HomePageBody/Services/index";
import Stylist from "../../components/HomePageBody/Stylist/index";
import News from "../../components/HomePageBody/News/index"

const Home = () => {
  return (
    <>
      <Header />
      <IntroComponent />
      <Services />
      <Stylist />
      <News />
      <Footer />
    </>
  );
};

export default Home;
