import React, { useState } from 'react';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform admin login actions
    console.log(`Admin Username: ${username}`);
    console.log(`Admin Password: ${password}`);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ color: '#007BFF', marginBottom: '20px' }}>Admin Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff' }}>
        <label style={{ marginBottom: '10px' }}>
          Admin Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
        </label>
        <label style={{ marginBottom: '20px' }}>
          Admin Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
        </label>
        <input type="submit" value="Admin Login" style={{ padding: '10px', border: 'none', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer' }} />
      </form>
    </div>
  );

}

export default AdminLogin;
