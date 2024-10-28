import AppRoutes from "../../routes/Routes";
import "../../../src/index.scss";
import setUpInterceptor from "../../services/api.service";
import { store } from "../../store/store";
import { useSelector } from "react-redux";
import DisconnectPage from "../DisconnectPage";
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

//component này để xử lý disconnect, token hết hạn,...
const App = () => {
  // const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname !== "/") {
  //     window.history.replaceState(null, null, "/");
  //   }
  // }, [location]);
  setUpInterceptor(store);
  const isOnline = useSelector((state) => state.rootReducer.app.onLineStatus);
  return (
    <div className="App">{isOnline ? <AppRoutes /> : <DisconnectPage />}</div>
  );
};

export default App;
