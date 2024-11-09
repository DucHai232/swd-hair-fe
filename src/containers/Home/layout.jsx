import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import { Outlet } from "react-router-dom";

const layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default layout;
