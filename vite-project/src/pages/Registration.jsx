// changes made:
// add form component import and change form to match
import { useState } from "react";
import { useRegisterUserMutation } from "../store/registrationSlice";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const Registration = () => {
  const navigate = useNavigate();
  const [registerUserApi, { isLoading, error }] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUserApi(formData).unwrap();

      navigate("/login");

    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
      <h2>Registration</h2>
      {error && (
        <p style={{ color: "red" }}>
          {error.data?.message || "Registration failed. Please try again."}
        </p>
      )}
      <Form
        formType="register"
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};

export default Registration;
