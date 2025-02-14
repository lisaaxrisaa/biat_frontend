import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateUserMutation } from '../store/updateProfileSlice';
import { updateUser } from '../store/authSlice';
import { useNavigate } from 'react-router';
import './update-profile.css';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [updateUserApi, { isLoading, error }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserApi(formData).unwrap();
      dispatch(updateUser(response.user));
      navigate('/profile');
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  return (
    <>
      <div className="update-profile-wrapper">
        <div className="update-profile-container">
          <div className="update-profile-header">
            <h2>Update Profile</h2>
          </div>
          {error && (
            <p className="error-message">
              {error.data?.message || 'Update failed.'}
            </p>
          )}
          <form className="update-profile-form" onSubmit={handleSubmit}>
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
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
