import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar(props) { 

  const navigate = useNavigate();

  const handleLogout = () => {
    props.onLogout();
    navigate('/home'); 
  }

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#b5bbc9" }}>
      <h1 style={{ margin: 0, fontFamily: "Arial, sans-serif", fontSize: "24px" }}>Restavracija</h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link style={{ textDecoration: "none", color: "#333", fontFamily: "Arial, sans-serif", fontSize: "16px" }} to="/home">Home</Link>
        {props.id === "" ?
          <>
            <Link style={{ textDecoration: "none", color: "#333", fontFamily: "Arial, sans-serif", fontSize: "16px" }} to="/login">Login</Link>
            <Link style={{ textDecoration: "none", color: "#333", fontFamily: "Arial, sans-serif", fontSize: "16px" }} to="/register">Register</Link>
            <Link style={{ textDecoration: "none", color: "#333", fontFamily: "Arial, sans-serif", fontSize: "16px" }} to="/logs">Logs</Link>
          </>
          :
          <>
            <Link style={{ textDecoration: "none", color: "#333", fontFamily: "Arial, sans-serif", fontSize: "16px" }} to="/menu">Menu</Link>
            <Link style={{ textDecoration: "none", color: "#333", fontFamily: "Arial, sans-serif", fontSize: "16px" }} to="/user">User</Link>
            <Link style={{ textDecoration: "none", color: "#333", fontFamily: "Arial, sans-serif", fontSize: "16px" }} to="/orders">Orders</Link>
            {props.isAdmin === "true" ? null :
              <Link style={{ textDecoration: "none", color: "#333", fontFamily: "Arial, sans-serif", fontSize: "16px" }} to="/notifications">Notifications</Link>}
            <button style={{ textDecoration: "none", color: "#333", fontFamily: "Arial, sans-serif", fontSize: "16px", border: "none", backgroundColor: "transparent", cursor: "pointer" }} onClick={handleLogout}>Logout</button>
          </>
        }
        <Link style={{ textDecoration: "none", color: "#333", fontFamily: "Arial, sans-serif", fontSize: "16px" }} to="/logs">Analysis</Link>
      </div>
    </nav>
  );
  
}

export default Navbar;
