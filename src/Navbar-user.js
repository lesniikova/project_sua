import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

function NavbarUser({id}) {

  if (!id) {
    return null; 
  }
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", backgroundColor: "#b5bbc9" }}>
      <h1 style={{ margin: 0 }}></h1>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link style={{ textDecoration: "none", color: "#333" }} to="/profile">Profile</Link>
        <Link style={{ textDecoration: "none", color: "#333" }} to="/orders">Orders</Link>
        <Link style={{ textDecoration: "none", color: "#333" }} to="/notifications">Notifications</Link>
        <Link style={{ textDecoration: "none", color: "#333" }} to="/menu">Menu</Link>
        <Link style={{ textDecoration: "none", color: "#333" }} to="/logout">Logout</Link>
      </div>
    </nav >
  );
}

export default NavbarUser;
