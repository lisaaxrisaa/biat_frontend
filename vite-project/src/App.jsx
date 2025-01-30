import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
import Registration from './pages/Registration';
// import SingleUser from './pages/SingleUser';
import NavBar from '../../NavBar';
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/register" element={<Registration />} />
            {/* <Route path="/user/:id" element={<SingleUser />} /> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
