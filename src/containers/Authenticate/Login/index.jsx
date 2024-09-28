import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../feature/authentication";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation()
  console.log(location)
  const accessToken = useSelector((state) => state.user.accessToken)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    const res = await dispatch(loginUser(formData));
  };
  useEffect(() => {
    console.log(accessToken)
  }, [accessToken])

  return (
    <>
      <h1>HAIRHARMONY</h1>
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
      <button onClick={() => handleLogin()}>Login</button>
    </>
  );
}

export default App;
