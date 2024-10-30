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

function Login() {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Ant Design form instance

  // Handle login after form validation
  const handleLogin = async (values) => {
    try {
      const userData = await login(values).unwrap();
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
        throw new Error("Invalid user role.");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <Spin spinning={isLoading} delay={1000}>
        <div className={styles.background}>
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
                <h1 className={styles.title}>Welcome</h1>
                <span className={styles.subtitle}>
                  Enter with style, leave with confidence!
                </span>
              </div>

              <Form
                form={form}
                layout="vertical"
                name="login"
                initialValues={{ remember: true }}
                autoComplete="off"
                className={styles.form}
                onFinish={handleLogin} // Trigger login on successful validation
              >
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.fullWidthButton}
                >
                  Login
                </Button>

                <div className={styles.forgotPasswordContainer}>
                  <Link to={endpoints.VERIFY_OTP_CHANGE_PASSWORD}>
                    Forgot Password?
                  </Link>
                </div>

                <span className={styles.signupContainer}>
                  Don&apos;t have an account yet?{" "}
                  <strong>
                    <Link to={endpoints.REGISTER}>Sign up here!</Link>
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
