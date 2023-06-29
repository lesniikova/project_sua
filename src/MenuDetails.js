import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MenuDetails = () => {
  const location = useLocation();
  const [menuItem, setMenuItem] = useState("");
  const itemId = location.state.menuId;
  const userId = location.state.userId;
  const isAdmin = location.state.isAdmin;
  const [isEditing, setIsEditing] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuCategory, setMenuCategory] = useState("");

  const navigate = useNavigate();

  const hadleMenuCreate = async () => {
    setIsEditing(false);

    const data = {
      name: menuName,
      price: menuPrice,
      category: menuCategory
    };

  try {
    const response = await axios.put(`http://localhost:8000/menu/${itemId}`, data);
    console.log('Menu updated: ', response.data);
    hadleMenu();
  }catch (error) {
      console.error('Error updating menu:', error);
    }
}

const hadleDelete = async () => {

    try {
      const response = await axios.delete(`http://localhost:8000/menu/${itemId}`);
      console.log('Menu deleted: ', response.data);
      navigate('/menu'); 
    }catch (error) {
        console.error('Error deleting menu:', error);
      }
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const hadleMenu = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/menu/${itemId}`);
      console.log('Menu', response.data);
      setMenuItem(response.data)
      setMenuCategory(response.data.category)
      setMenuName(response.data.name)
      setMenuPrice(response.data.price)
    }catch (error) {
        console.error('Error getting menu:', error);
      }
  }

  const handleOrder = async () => {

    const data = {
        name: menuItem.name,
        price: menuItem.price,
        user_id: userId
      };
    
      try {
        await axios.post('http://localhost:3000/orders', data);
    
        console.log('Item ordered successfully!');
        navigate('/orders'); 
      } catch (error) {
        console.log('Order failed.', error);
  
      }

  }

  useEffect(() => {
    hadleMenu();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ color: '#007BFF', marginBottom: '20px' }}>Menu Items</h1>
  
      {menuItem !== "" ? (
        !isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', marginBottom: '10px' }}>
            <h2 style={{ marginBottom: '10px' }}>{menuItem.name}</h2>
            <h2 style={{ marginBottom: '10px' }}>{menuItem.category}</h2>
            <h2 style={{ marginBottom: '10px' }}>{menuItem.price}</h2>
            {isAdmin == "false" ? (
              <button style={{ textDecoration: 'none', color: '#333', padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer' }} onClick={handleOrder}>Order</button>
            ) : (
              <>
                <button style={{ textDecoration: 'none', color: '#333', padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer' }} onClick={handleEdit}>Edit item</button>
                <br/>
                <button style={{ textDecoration: 'none', color: '#333', padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer' }} onClick={hadleDelete}>Delete item</button>
              </>
            )}
          </div>
        ) : (
          <></>
        )
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', textAlign: 'center' }}>
          <p>No menu details found.</p>
        </div>
      )}
  
      {isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff' }}>
          <label style={{ marginBottom: '10px' }}>
            Name:
            <input type="text" value={menuName} onChange={(e) => setMenuName(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
          </label>
          <label style={{ marginBottom: '10px' }}>
            Category:
            <input type="text" value={menuCategory} onChange={(e) => setMenuCategory(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
          </label>
          <label style={{ marginBottom: '10px' }}>
            Price:
            <input type="number" value={menuPrice} onChange={(e) => setMenuPrice(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
          </label>
          <button onClick={hadleMenuCreate} style={{ padding: '10px', border: 'none', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer' }}>Save</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
  
}

export default MenuDetails;
