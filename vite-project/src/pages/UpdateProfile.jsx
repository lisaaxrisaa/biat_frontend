import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUpdateUserMutation } from '../store/updateProfileSlice';
import { updateUser } from '../store/authSlice';
import { useNavigate } from 'react-router';

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
      <h2>Update Profile</h2>
      {error && (
        <p style={{ color: 'red' }}>
          {error.data?.message || 'Update failed.'}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
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

        <button type="submit" disabled={isLoading} className="btn btn-primary">
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </>
  );
};

export default UpdateProfile;
