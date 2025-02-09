// changes made:
// add form component import and change form to match
import { useState } from 'react';
import { useRegisterUserMutation } from '../store/registrationSlice';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [registerUserApi, { isLoading, error }] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUserApi(formData).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <>
      <h2>Registration</h2>
      {error && (
        <p style={{ color: 'red' }}>
          {error.data?.message || 'Registration failed. Please try again.'}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading} className="btn btn-primary">
          Register
        </button>
      </form>
    </>
  );
};

export default Registration;
