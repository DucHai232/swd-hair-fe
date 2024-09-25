import { Button, Form, Input } from "antd";
import styles from "./Login.module.scss";
import hair_salon_2 from "../../../assets/hair_salon_2.jpg";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className={styles.background}>
      <div className={styles.loginContainer}>
        <div className={styles.imageContainer}>
          <img src={hair_salon_2} alt="hair_salon" className={styles.image} />
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
              <Link>Forgot Password?</Link>
            </div>

            <span className={styles.signupContainer}>
              Dont have an account yet?{" "}
              <strong>
                <Link>Sign up here!</Link>
              </strong>
            </span>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
