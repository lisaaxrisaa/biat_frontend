// login.jsx: user enters their email and password in form
// save token and use redux tool kit and redirect to home page
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/authSlice";
// import { setToken }
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registeredUser = JSON.parse(localStorage.getItem("userData"));
  const [error, setError] = useState(null);

  //  mock token as there is no api in use
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      registeredUser?.email === email &&
      registeredUser?.password === password
    ) {
      const token = "mock-auth-token";
      dispatch(registerUser({ token }));
      sessionStorage.setItem("authToken", token);
      navigate("/");
    } else {
      setError("Unauthorized login, try again later!");
    }
    // if time allows: error handling
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
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
