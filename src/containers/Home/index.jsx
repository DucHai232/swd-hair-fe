import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
import IntroComponent from "../../components/HomePageBody/IntroComponent/index";
import Services from "../../components/HomePageBody/Services/index";
import Stylist from "../../components/HomePageBody/Stylist/index";
import News from "../../components/HomePageBody/News/index"
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
      <News />
      <Footer />
    </>
  );
};

export default Home;
