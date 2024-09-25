import AppRoutes from "../../routes/Routes";
import "../../../src/index.scss";
import setUpInterceptor from "../../services/api.service";
import { store } from "../../store/store";

//component này để xử lý disconnect, token hết hạn,...
const App = () => {
  setUpInterceptor(store)
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;
