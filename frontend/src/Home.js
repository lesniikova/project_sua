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
import NavbarUser from './Navbar-user';
import MenuDetails from './MenuDetails';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function Home() {
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '2rem', textAlign: 'center', backgroundColor: '#f5f5f5', height: '100vh' }}>
          <h1 style={{ color: '#007BFF', marginBottom: '1.5rem' }}>
            WELCOME
            {id !== "" && admin === "true" ? <> ADMIN</> : <></>}
            {id !== "" && admin === "false" ? <> USER</> : <></>}
          </h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', fontSize: '1.2rem' }}>
            Experience the best in fine dining at Restavracija. Our world-class chefs use only the freshest ingredients, locally sourced and expertly prepared to create an unforgettable dining experience.
          </p>
      
          <h2 style={{ marginTop: '2.5rem', color: '#007BFF' }}>Signature Dishes</h2>
          <ul style={{ listStyle: 'none', padding: '0', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <li style={{ margin: '1rem', padding: '1rem', border: '1px solid #007BFF', borderRadius: '8px' }}>Steak Fiorentina</li>
            <li style={{ margin: '1rem', padding: '1rem', border: '1px solid #007BFF', borderRadius: '8px' }}>Truffle Ravioli</li>
            <li style={{ margin: '1rem', padding: '1rem', border: '1px solid #007BFF', borderRadius: '8px' }}>Seafood Paella</li>
            <li style={{ margin: '1rem', padding: '1rem', border: '1px solid #007BFF', borderRadius: '8px' }}>Chocolate Mousse</li>
          </ul>
          <h2 style={{ marginTop: '2.5rem', color: '#007BFF' }}>Item of the day: </h2>
          <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', marginBottom: '10px' }}>
            <h2 style={{ marginBottom: '10px' }}>{menu.name}</h2>
            <h2 style={{ marginBottom: '10px' }}>{menu.category}</h2>
            <h2 style={{ marginBottom: '10px' }}>{menu.price}$</h2>
          </div>
        </div>
      );
      
}

export default Home;