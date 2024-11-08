import { Button, Form, Input } from "antd";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import hair_salon_2 from "../../../assets/hair_salon_2.jpg";
import { useRegisterMutation } from "../../../services/hairsalon.service.js";
import { toast } from "react-toastify";
import BackButton from "../../../components/Buttons/backButton.jsx";

function Register() {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();
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
      // Show toast notification in case of error
      toast.error(
        err?.data?.message || "Đăng ký không thành công. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className={styles.background}>
      <BackButton />
      <div className={styles.loginContainer}>
        <div className={styles.imageContainer}>
          <img src={hair_salon_2} alt="hair_salon" className={styles.image} />
        </div>

        <div className={styles.formContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Đăng Ký</h1>
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
            onFinish={handleRegister}
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
              Đăng ký
            </Button>

            {error && (
              <div className={styles.errorMessage}>
                {error.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại."}
              </div>
            )}

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
