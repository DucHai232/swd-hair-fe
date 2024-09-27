import AppRoutes from "../../routes/Routes";
import "../../../src/index.scss";
import setUpInterceptor from "../../services/api.service";
import { store } from "../../store/store";
import { useSelector } from "react-redux";
import DisconnectPage from "../DisconnectPage";

//component này để xử lý disconnect, token hết hạn,...
const App = () => {
  setUpInterceptor(store)
  const isOnline = useSelector(state => state.app.onLineStatus)
  return (
    <div className="App">
      {isOnline ? <AppRoutes /> : <DisconnectPage />}
    </div>
  );
};

export default App;
