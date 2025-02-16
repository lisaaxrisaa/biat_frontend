import { useState } from 'react';
import { useRegisterUserMutation } from '../store/registrationSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './registration.css';

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
      <div className="registration-page">
        <div className="registration-container">
          <h2 className="registration-title">Registration</h2>
          {error && (
            <p className="registration-error-message">
              {error.data?.message || 'Registration failed. Please try again.'}
            </p>
          )}

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="registration-form-group">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="registration-input"
              />
            </div>
            <div className="registration-form-group">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="registration-input"
              />
            </div>
            <div className="registration-form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="registration-input"
              />
            </div>
            <div className="registration-form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="registration-input"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="registration-button"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
