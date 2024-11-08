import IntroComponent from "../../components/HomePageBody/IntroComponent/index";
import Services from "../../components/HomePageBody/Services/index";
import Stylist from "../../components/HomePageBody/Stylist/index";
import News from "../../components/HomePageBody/News/index";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setFirstLogin } from "../../feature/authentication";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.rootReducer.user.username);
  const isLoggedIn = useSelector((state) => state.rootReducer.user.isLoggedIn);
  const isFirstLogin = useSelector(
    (state) => state.rootReducer.user.isFirstLogin
  );

  useEffect(() => {
    //check first entry page for display toast
    if (isFirstLogin) {
      toast.success(`Welcome ${username}`);
      dispatch(setFirstLogin(false));
    }
    if (location.state?.rejectAccess && !isLoggedIn) {
      toast.error(`Please login to use this feature`);
    } else if (location.state || location.state?.rejectAccess) {
      toast.error(`Reject access`);
    }
  }, [dispatch, isFirstLogin, isLoggedIn, location.state, username]);
  return (
    <>
      <ToastContainer />
      <IntroComponent />
      <Services />
      <Stylist />
      <News />
    </>
  );
};

export default Home;
