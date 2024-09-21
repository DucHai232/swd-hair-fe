import AppRoutes from "../../routes/Routes";
import "../../../src/index.css";
//component này để xử lý disconnect, token hết hạn,...
const App = () => {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;
