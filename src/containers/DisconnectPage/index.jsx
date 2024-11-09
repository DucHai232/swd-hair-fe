import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import "./DisconnectPage.scss"; // Import your SCSS file
import { useNavigate } from "react-router-dom";
import { store } from "../../store/store";
import { setOnLineStatus } from "../../feature/app";

const DisconnectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOnline = () => {
      store.dispatch(setOnLineStatus(true));
    };

    const handleOffline = () => {
      toast.error("Bạn đã ngắt kết nối");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [navigate]);

  const handleRetry = async () => {
    if (navigator.onLine) {
      toast.success("Bạn đã trực tuyến trở lại!");
      navigate(-1);
    } else {
      toast.error("Vẫn bị ngắt kết nối. Vui lòng kiểm tra kết nối của bạn.");
    }
  };

  return (
    <div className="disconnect-container">
      <div className="disconnect-content">
        <h1 className="disconnect-title">Mất kết nối</h1>
        <p className="disconnect-message">
          Có vẻ như bạn đã mất kết nối internet. Vui lòng kiểm tra cài đặt mạng
          và thử lại.
        </p>
        <button className="retry-button" onClick={handleRetry}>
          Thử lại kết nối và về trang chủ
        </button>
      </div>
      <ToastContainer />{" "}
      {/* ToastContainer must be included to display toasts */}
    </div>
  );
};

export default DisconnectPage;
