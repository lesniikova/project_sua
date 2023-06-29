import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password
    };
  
    try {
      const response = await axios.post('http://localhost:5000/users/login', data);
      console.log(response.data)
      props.onLogin(response.data.id, response.data.token, response.data.isAdmin);
      navigate('/home'); 
    } catch (error) {
      console.log('Login failed.', error);
      setError('Something went wrong! Login failed.');
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ color: '#007BFF', marginBottom: '20px' }}>User login</h1>
      {error && <p>{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff' }}>
        <label style={{ marginBottom: '10px' }}>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
        </label>
        <label style={{ marginBottom: '20px' }}>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
        </label>
        <input type="submit" value="Submit" style={{ padding: '10px', border: 'none', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer' }} />
      </form>
    </div>
  );

}

export default Login;
