import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../feature/authentication";

function App() {
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
    console.log(res);
  };

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
