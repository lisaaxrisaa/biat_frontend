// potential changes:
// localStorage instead of sessionStorage (for different token storage)

import { useState } from "react";
import { useLoginUserMutation } from "../store/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loginUserApi, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };

      const response = await loginUserApi(credentials).unwrap();

      dispatch(registerUser({ token: response.token, user: response.user }));
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    } catch (error) {
      setError("Invalid login, please try again!");
      console.error("Invalid login, please try again!", error);
    }
  };

  return (
    <>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default Login;
