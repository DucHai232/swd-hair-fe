import { Button, Form, Input } from "antd";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import hair_salon_2 from "../../../assets/hair_salon_2.jpg";
import { useRegisterMutation } from "../../../services/hairsalon.service.js"; // Import register mutation

function Register() {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation(); // useRegisterMutation hook
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle registration form submission
  const handleRegister = async (values) => {
    try {
      const res = await register(values).unwrap();
      if (res) {
        navigate("/home");
      }
    } catch (err) {
      console.error("Registration failed: ", err);
      // You can use toast or another notification system to show errors
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.loginContainer}>
        <div className={styles.imageContainer}>
          <img src={hair_salon_2} alt="hair_salon" className={styles.image} />
        </div>

        <div className={styles.formContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Sign Up</h1>
            <span className={styles.subtitle}>
              Hãy cùng chúng tôi trải nghiệm phong cách đẳng cấp nhất!
            </span>
          </div>

          <Form
            layout="vertical"
            name="register"
            initialValues={{ remember: true }}
            autoComplete="off"
            className={styles.form}
            onFinish={handleRegister} // Use onFinish to handle form submission
          >
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
              ]}
              style={{ marginBottom: "-10px" }}
            >
              <Input
                placeholder="Tên đăng nhập..."
                name="username"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              style={{ marginBottom: "-10px" }}
            >
              <Input
                placeholder="Email..."
                name="email"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              style={{ marginBottom: "-10px" }}
            >
              <Input.Password
                placeholder="Mật khẩu..."
                name="password"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              rules={[{ required: true, message: "Xác nhận lại mật khẩu!" }]}
            >
              <Input.Password
                placeholder="Xác nhận mật khẩu..."
                name="confirmPassword"
                onChange={handleChange}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className={styles.fullWidthButton}
              loading={isLoading}
            >
              Register
            </Button>

            <span className={styles.signupContainer}>
              Bạn đã có tài khoản?{" "}
              <strong>
                <Link to="/login">Đăng nhập ngay!</Link>
              </strong>
            </span>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
