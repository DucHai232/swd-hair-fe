// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../../feature/authentication";
import { Button, Card, Carousel, Form, Input } from "antd";
import styles from "./Login.module.scss";
import hair_salon_space_1 from "../../../assets/hair_salon_space_1.png";
import do_hair_1 from "../../../assets/do_hair_1.jpg";
import man_hair_2 from "../../../assets/man_hair_2.jpg";
// import BackButton from "../../../components/button/backButton";
function App() {
  // const accessToken = useSelector((state) => state.user.accessToken);
  // const dispatch = useDispatch();
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  // const handleLogin = async () => {
  //   const res = await dispatch(loginUser(formData));
  // };
  // useEffect(() => {
  //   console.log(accessToken);
  // }, [accessToken]);

  return (
    <>
      <div className={styles.background}>
        {/* <BackButton path={} /> */}
        <img src={hair_salon_space_1} alt="hair_salon" />
        <div className={styles.container}>
          <div className={styles.carousel}>
            <Carousel autoplay>
              <div key="1">
                <Card
                  cover={
                    <img
                      src={do_hair_1}
                      alt="man_hair"
                      className={styles.carouselImg}
                    />
                  }
                ></Card>
              </div>
              <div key="2">
                <Card
                  cover={
                    <img
                      src={man_hair_2}
                      alt="man_hair"
                      className={styles.carouselImg}
                    />
                  }
                ></Card>
              </div>
              <div key="3">
                <Card
                  cover={
                    <img
                      src={man_hair_2}
                      alt="man_hair"
                      className={styles.carouselImg}
                    />
                  }
                ></Card>
              </div>
            </Carousel>
          </div>
          <div className={styles.form_login}>
            <h1 className={styles.login_title}>Welcome</h1>
            <span className={styles.login_subtitle}>
              {" "}
              Enter with style, leave with confidence!
            </span>
            <Form
              layout="vertical"
              name="login"
              initialValues={{ remember: true }}
              autoComplete="off"
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

              <Form.Item>
                <div className="flex justify-center"></div>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        {/* 
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <button onClick={() => handleLogin()}>Login</button> */}
      </div>
    </>
  );
}

export default App;
