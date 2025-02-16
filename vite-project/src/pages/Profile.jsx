import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <p> Loading user ...</p>;
  }

  const profileInitial = user.first_name
    ? user.first_name.charAt(0).toUpperCase()
    : 'U';

  return (
    <>
      <div className="profile-wrapper">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-picture">{profileInitial}</div>
            <h2>My Profile</h2>
          </div>
          <div className="profile-details">
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
          </div>
          <button
            className="edit-profile-button"
            onClick={() => navigate('/update-profile')}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
