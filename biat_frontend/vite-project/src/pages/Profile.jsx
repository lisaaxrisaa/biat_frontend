import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <p> Loading user ...</p>;
  }

  return (
    <>
      <h2>My Profile</h2>
      <p>
        <strong>First Name:</strong>
        {user.first_name}
      </p>
      <p>
        <strong>Last Name:</strong>
        {user.last_name}
      </p>
      <p>
        <strong>Email:</strong>
        {user.email}
      </p>

      <button onClick={() => navigate('/update-profile')}>Edit Profile</button>
    </>
  );
};

export default Profile;
