import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import IntroComponent from "../../components/HomePageBody/IntroComponent/index";
import Services from "../../components/HomePageBody/Services/index";
import Stylist from "../../components/HomePageBody/Stylist/index";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setFirstLogin } from "../../feature/authentication";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)
  const isFirstLogin = useSelector((state) => state.user.isFirstLogin)

    useEffect(() => {
      if (isFirstLogin) {
        toast.success(`Welcome ${username}`)
        dispatch(setFirstLogin(false))
        
      }
    }, [dispatch, isFirstLogin, username])
  return (
    <>
    <ToastContainer/>
      <Header />
      <IntroComponent />
      <Services />
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
