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
              Join us for the ultimate style experience!
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
              label="Username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input
                placeholder="Enter your username"
                name="username"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                placeholder="Enter your password"
                name="password"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[{ required: true, message: "Please confirm your password!" }]}
            >
              <Input.Password
                placeholder="Confirm your password"
                name="confirmPassword"
                onChange={handleChange}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className={styles.fullWidthButton}
              loading={isLoading} // Show loading spinner when the request is in progress
            >
              Register
            </Button>

            <span className={styles.signupContainer}>
              Already have an account?{" "}
              <strong>
                <Link to="/login">Login here!</Link>
              </strong>
            </span>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
