import { Button, Form, Input, Spin } from "antd";
import styles from "./Login.module.scss";
import hair_salon_2 from "../../../assets/hair_salon_2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setFirstLogin } from "../../../feature/authentication";
import { toast, ToastContainer } from "react-toastify";
import endpoints from "../../../consts/endPoint";

function Login() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const error = useSelector((state) => state.user.error);
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.role);
  const isFirstLogin = useSelector((state) => state.user.isFirstLogin);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });



  // Handle change for username input
  const handleUsernameChange = (e) => {
    setFormData({ ...formData, username: e.target.value });
    console.log("username:", e.target.value);
  };

  // Handle change for password input
  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
    console.log("password:", e.target.value);
  };

  // Handle login
  const handleLogin = async () => {
    await dispatch(loginUser(formData));
    if (!error) {
      dispatch(setFirstLogin(true));
    } else {
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
  const handleNavigateRole = () => {
    if (userRole.includes("manager")) {
      navigate("/manager-dashboard");
    } else if (userRole.includes("staff")) {
      navigate("/staff-dashboard");
    } else if (userRole.includes("stylist")) {
      navigate("/stylist-appointment");
    } else if (userRole.includes("admin")) {
      navigate("/admin-dashboard");
    } else if (userRole.includes("customer")){
      navigate("/");
    } else {
    navigate("/login");
  }
  };
  if (isFirstLogin) {
    handleNavigateRole()
  }

  }, [isFirstLogin, navigate, userRole]);

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
                layout="vertical"
                name="login"
                initialValues={{ remember: true }}
                autoComplete="off"
                className={styles.form}
              >
                <Form.Item
                  name="username"
                  onChange={handleUsernameChange}
                  label="Username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  onChange={handlePasswordChange}
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
                  onClick={() => handleLogin(formData)}
                >
                  Login
                </Button>

                <div className={styles.forgotPasswordContainer}>
                  <Link to={endpoints.VERIFY_OTP_CHANGE_PASSWORD}>
                    Forgot Password?
                  </Link>
                </div>

                <span className={styles.signupContainer}>
                  Dont have an account yet?{" "}
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
