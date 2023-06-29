import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css';
import Login from './Login';
import Register from './Register';
import AdminLogin from './AdminLogin';
import AdminRegister from './AdminRegister';
import UserProfile from './UserProfile';
import UserOrders from './UserOrders';
import UserNotifications from './UserNotifications';
import Menu from './Menu'
import Home from './Home';
import NavbarUser from './Navbar-user';
import MenuDetails from './MenuDetails';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Logs from './Logs';

function App() {
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  const [menu, setMenu] = useState(false);

  const handleLogin = (id, token, isAdmin) =>{
    setId(id);
    setToken(token);
    setAdmin(isAdmin);
  }

  const handleLogout = () =>{
    setId("");
    setToken("");
  }

  const hadleMenuRandom = async () => {
    try {
      const response = await axios.get('http://localhost:8000/menu/random');
      console.log('Menu', response.data);
      setMenu(response.data)
    }catch (error) {
        console.error('Error getting menu:', error);
      }
  }

  useEffect(() => {
    hadleMenuRandom();
  }, []);

  return (
    <div>
      <Router>
        <Navbar id={id} isAdmin={admin} onLogout={handleLogout}/>
        <NavbarUser />
          <Routes>
            <Route path="/home" element={<Home /> } />
            <Route path="/user" element={<UserProfile isAdmin={admin} id={id} token={token}/>}/>
            <Route path="/orders" element={<UserOrders isAdmin={admin} id={id}/>} />{/*izpišeš zgodovino orderjev za uporabnika*/}
            <Route path="/notifications" element={<UserNotifications token={token} id={id} />} /> {/* notifikacije za vse uporabnika */}
            <Route path="/menu" element={<Menu isAdmin={admin} id={id} token={token}/>} />{/* seznam item-ov; vsak item ima gumbek za order -> shrani order z user id*/}
            <Route path="/login" element={<Login onLogin={handleLogin}/>} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/menu-det" element={<MenuDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/logs" element={<Logs />} />
          </Routes>
      </Router>
      <ToastContainer />
      

    </div>

  );
}

export default App;
