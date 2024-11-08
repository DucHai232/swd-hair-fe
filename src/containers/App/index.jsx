import AppRoutes from "../../routes/Routes";
import "../../../src/index.scss";
import setUpInterceptor from "../../services/api.service";
import { store } from "../../store/store";
import { useSelector } from "react-redux";
import DisconnectPage from "../DisconnectPage";

// Set up API interceptor for handling disconnect and token expiration
setUpInterceptor(store);

const App = () => {
  const isOnline = useSelector((state) => state.rootReducer.app.onLineStatus);

  return (
    <div className="App">{isOnline ? <AppRoutes /> : <DisconnectPage />}</div>
  );
};

export default App;
