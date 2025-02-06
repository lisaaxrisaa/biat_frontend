// changes made:
// import form component
// replace current form with new (bootstrap) form component
// remove const email and password, which are no longer needed

import { useState } from "react";
import { useLoginUserMutation } from "../store/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/authSlice";
import Form from "./Form";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loginUserApi, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (e, email, password) => {
    // add email and password since they are no longer declared
    e.preventDefault();
    try {
      const credentials = { email, password };
      const response = await loginUserApi(credentials).unwrap();
      dispatch(registerUser({ token: response.token, user: response.user }));
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
      <Form
        formType="login"
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};

export default Login;
