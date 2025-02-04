// changes made:
// - replaced mock token with api token
// - add isLoading for button, keeps users from double submitting and lets them know it is processing
// - improved error handling

import { useState } from 'react';
import { useLoginUserMutation } from '../store/loginSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      navigate('/');
    } catch (error) {
      setError('Invalid login, please try again!');
      console.error('Invalid login, please try again!', error);
    }
  };

  return (
    <>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
        <button type="submit" disabled={isLoading} className="btn btn-primary">
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </>
  );
};

export default Login;
