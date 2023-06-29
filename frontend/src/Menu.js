import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MenuItems = (props) => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [selectedOption, setSelectedOption] = useState('');

  const hadleMenu = async () => {
    try {
      const response = await axios.get('http://localhost:8000/menu/all');
      console.log('Menu', response.data);
      setMenuItems(response.data)
    }catch (error) {
        console.error('Error getting menu:', error);
      }
  }

  const handleToken = async () => {
    console.log(props.token)
    try {
      const response = await axios.get('http://localhost:8000/menu/protected', {
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      });
      toast.success('Token accepted', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
      hadleMenu();
    }catch (error) {
      toast.error('Token rejected', {
        position: toast.POSITION.BOTTOM_RIGHT
      }); 
        console.error('Error getting menu:', error);
      }
  }

  const handleFilter = async (cat) => {
    try {
      const response = await axios.get(`http://localhost:8000/menu/category/${cat}`);
      console.log('Menu', response.data);
      setMenuItems(response.data)
    }catch (error) {
        console.error('Error getting menu:', error);
      }
  }
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const hadleMenuCreate = async (event) => {
      event.preventDefault();

      const data = {
        name: menuName,
        price: Number(menuPrice),
        category: selectedOption
      };

    try {
      console.log(data)
      await axios.post('http://localhost:8000/menu/create', data);
      console.log('Menu created: ');
      hadleMenu();
    }catch (error) {
        console.error('Error creating menu:', error);
      }
  }

  useEffect(() => {
    handleToken();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
      {props.isAdmin === "true" && (
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#007BFF', marginBottom: '20px', textAlign: 'center' }}>Add Menu Item</h1>
          <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff' }}>
            <label style={{ marginBottom: '10px' }}>
              Name:
              <input type="text" value={menuName} onChange={(e) => setMenuName(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
            </label>
            <label style={{ marginBottom: '10px' }}>
              Category:
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '5px' }}>
                  <input
                    type="radio"
                    value="Food"
                    checked={selectedOption === 'Food'}
                    onChange={handleOptionChange}
                    style={{ marginRight: '5px' }}
                  />
                  Food
                </label>
                <label>
                  <input
                    type="radio"
                    value="Drinks"
                    checked={selectedOption === 'Drinks'}
                    onChange={handleOptionChange}
                    style={{ marginRight: '5px' }}
                  />
                  Drinks
                </label>
              </div>
            </label>
            <label style={{ marginBottom: '10px' }}>
              Price:
              <input type="number" value={menuPrice} onChange={(e) => setMenuPrice(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
            </label>
            <button onClick={hadleMenuCreate} style={{ padding: '10px', border: 'none', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer' }}>Save</button>
          </div>
        </div>
      )}
      <h1 style={{ color: '#007BFF', marginBottom: '20px', textAlign: 'center' }}>Menu</h1>
      <div style={{ marginBottom: '10px' }}>
        Filter:
        <button onClick={() => handleFilter("Food")} style={{ marginLeft: '5px', cursor: 'pointer', border: 'none', backgroundColor: 'transparent', color: '#007BFF' }}>Food</button>
        <button onClick={() => handleFilter("Drinks")} style={{ marginLeft: '5px', cursor: 'pointer', border: 'none', backgroundColor: 'transparent', color: '#007BFF' }}>Drinks</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'scroll', height: 'calc(100vh - 200px)' }}>
        {menuItems.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {menuItems.map(item => (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', marginBottom: '10px' }}>
                <h2 style={{ marginBottom: '10px' }}>{item.name}</h2>
                <Link
                  to={{ pathname: "/menu-det" }}
                  state={{ menuId: item.id, userId: props.id, isAdmin: props.isAdmin }}
                  style={{ color: '#007BFF', textDecoration: 'none' }}
                >
                  Details
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', textAlign: 'center' }}>
            <p>No menu items found.</p>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default MenuItems;
