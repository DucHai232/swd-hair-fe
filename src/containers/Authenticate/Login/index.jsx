import { Button, Form, Input, Spin } from "antd";
import styles from "./Login.module.scss";
import hair_salon_2 from "../../../assets/hair_salon_2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import endpoints from "../../../consts/endpoint.js";
import { useLoginMutation } from "../../../services/hairsalon.service.js";
import {
  setAccessToken,
  setAvatar,
  setFirstLogin,
  setIsLoggedIn,
  setRole,
  setUsername,
} from "../../../feature/authentication.js";
import { useDispatch } from "react-redux";
import BackButton from "../../../components/Buttons/backButton.jsx";

function Login() {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Handle login after form validation
  const handleLogin = async (values) => {
    try {
      const userData = await login(values).unwrap();
      localStorage.setItem("user", JSON.stringify(userData?.user));
      dispatch(setAccessToken(userData?.access_token));
      dispatch(setRole(userData?.user?.role));
      dispatch(setUsername(userData?.user?.username));
      dispatch(setAvatar(userData?.user?.avatar));
      dispatch(setIsLoggedIn(true));
      dispatch(setFirstLogin(true));
      if (userData.user.role && userData.user.role.length > 0) {
        // Navigate based on role
        if (userData.user.role.includes("manager")) {
          navigate("/manager-dashboard");
        } else if (userData.user.role.includes("staff")) {
          navigate("/staff-dashboard");
        } else if (userData.user.role.includes("stylist")) {
          navigate("/stylist-appointment");
        } else if (userData.user.role.includes("admin")) {
          navigate("/admin-dashboard");
        } else if (userData.user.role.includes("customer")) {
          navigate("/");
        }
      } else {
        throw new Error("Vai trò người dùng không hợp lệ.");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || "Đăng nhập không thành công. Vui lòng thử lại."
      );
    }
  };

  return (
    <>
      <Spin spinning={isLoading} delay={1000}>
        <div className={styles.background}>
          <BackButton />
          <div className={styles.loginContainer}>
            <div className={styles.imageContainer}>
              <img
                src={hair_salon_2}
                alt="hair_salon"
                className={styles.image}
              />
            </div>

            <div className={styles.formContainer}>
              <div className={styles.titleContainer}>
                <h1 className={styles.title}>Đăng Nhập</h1>
                <span className={styles.subtitle}>
                  Bạn đi vào với phong cách, đi ra với sự tự tin!
                </span>
              </div>

              <Form
                form={form}
                layout="vertical"
                name="login"
                initialValues={{ remember: true }}
                autoComplete="off"
                className={styles.form}
                onFinish={handleLogin}
              >
                <Form.Item
                  name="username"
                  label="Tên đăng nhập"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                  ]}
                  style={{ marginBottom: "-10px" }}
                >
                  <Input placeholder="Tên đăng nhập..." />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                >
                  <Input.Password placeholder="Mật khẩu..." />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.fullWidthButton}
                >
                  Đăng nhập
                </Button>

                <div className={styles.forgotPasswordContainer}>
                  <Link to={endpoints.VERIFY_OTP_CHANGE_PASSWORD}>
                    Quên mật khẩu?
                  </Link>
                </div>

                <span className={styles.signupContainer}>
                  Bạn không có tài khoản?{" "}
                  <strong>
                    <Link to={endpoints.REGISTER}>Đăng ký ngay!</Link>
                  </strong>
                </span>
              </Form>
            </div>
          </div>
        </div>
      </Spin>
      <ToastContainer />
    </>
  );
}

export default Login;
