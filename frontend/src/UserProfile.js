import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserProfile(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPsw, setIsEditingPsw] = useState(false);
  const [psw, setPsw] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id] = useState(props.id);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);


  useEffect(() => {
    if(props.isAdmin == "false")
      handleGetUser();
    else
      handleGetUsers();
  }, []);

  const handleGetUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      console.log('Users:', response.data);
      setUsers(response.data)
    } catch (error) {
      if (error.response) {
        console.error('Error retrieving users:', error.response.status, error.response.data);
      } else {
        console.error('Error retrieving users:', error.message);
      }
    }
  };

  const handleGetUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      });
      console.log('User data:', response.data);
      setEmail(response.data.email);
      setName(response.data.name);
      toast.success('Token accepted', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } catch (error) {
      if (error.response) {
        toast.error('Token rejected', {
          position: toast.POSITION.BOTTOM_RIGHT
        }); 
        console.error('Error retrieving user:', error.response.status, error.response.data);
      } else {
        toast.error('Token rejected', {
          position: toast.POSITION.BOTTOM_RIGHT
        }); 
        console.error('Error retrieving user:', error.message);
      }
    }
  };

  const hadleDelete = async (userId) => {

    try {
      const response = await axios.delete(`http://localhost:5000/users/${userId}`);
      console.log('Menu deleted: ', response.data);
      handleGetUsers(); 
    }catch (error) {
        console.error('Error deleting menu:', error);
      }
  }


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditPsw = () => {
    setIsEditingPsw(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await axios.put(`http://localhost:5000/users/${id}`, {
        name: name,
        email: email
      });
      console.log('User changed:', response.data);
      handleGetUser();
    } catch (error) {
      console.error('Error changing user:', error);

    }
  }

  const handleSavePsw = async () => {
    setIsEditingPsw(false);
    try {
      const response = await axios.put(`http://localhost:5000/users/${id}/password`, {
        password: psw
      });
      console.log('Password changed:', response.data);
      handleGetUser();
    } catch (error) {
      console.error('Error changing password:', error);

    }
  }

  const handleSubmit = async (user_id) => {

    const data = {
      title: title,
      message: message
    };

    try {
      const response = await axios.post(`http://localhost:7000/notifications/users/${user_id}`, data);
      console.log('Sent notication to user:', user_id);
      setTitle("");
      setMessage("");
    } catch (error) {
      console.error('Error sending notification to user:', error);

    }
    setTitle('');
    setMessage('');
  };


  const handleMulNot = async () => {
    console.log(selectedValues);
    
    const data = {
      users:selectedValues,
      notification : {
        title: title,
        message: message
      }
    };

    try {
      const response = await axios.post("http://localhost:7000/notifications/users", data);
      console.log('Sent notication to users:', selectedValues);
      setTitle("");
      setMessage("");
    } catch (error) {
      console.error('Error sending notification to user:', error);

    }
    setTitle('');
    setMessage('');
  };

  const handleChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedValues([...selectedValues, parseInt(value)]);
    } else {
      setSelectedValues(selectedValues.filter((val) => val !== parseInt(value)));
    }

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa', overflow: 'auto' }}><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      {props.isAdmin === "false" ? (
        <>
          <h1 style={{ color: '#007BFF', marginBottom: '20px' }}>User Profile</h1>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff' }}>
              <label style={{ marginBottom: '10px' }}>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
              </label>
              <label style={{ marginBottom: '10px' }}>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
              </label>
              <button onClick={handleSave} style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer', border: 'none' }}>Save</button>
            </div>
          ) : isEditingPsw ? (
            <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff' }}>
              <label style={{ marginBottom: '10px' }}>
                New password:
                <input type="password" value={psw} onChange={(e) => setPsw(e.target.value)} style={{ width: '100%', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
              </label>
              <button onClick={handleSavePsw} style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer', border: 'none' }}>Save</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', textAlign: 'center' }}>
              <p style={{ marginBottom: '10px' }}>Username: {name}</p>
              <p style={{ marginBottom: '20px' }}>Email: {email}</p>
              <button onClick={handleEdit} style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer', border: 'none', marginBottom: '5px' }}>Edit</button>
              <br/>
              <button onClick={handleEditPsw} style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer', border: 'none', marginBottom: '5px' }}>Change password</button>
            </div>
          )}
        </>
      ) : (
        <>
          {users.length > 0 ? (
            <>
              <h1 style={{ color: '#007BFF', marginBottom: '20px' }}>Users</h1>
              {users.map(item => (
                item.isAdmin === "true" ? null : (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', marginBottom: '10px' }}>
                    <h2 style={{ marginBottom: '10px' }}>{item.name}</h2>
                    <h2 style={{ marginBottom: '10px' }}>{item.email}</h2>
                    <button onClick={() => hadleDelete(item.id)} style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer', border: 'none', marginBottom: '5px' }}>Delete user</button>
                    <br/>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ marginBottom: '5px', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" style={{ marginBottom: '5px', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
                    <br/>
                    <button onClick={() => handleSubmit(item.id)} style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer', border: 'none' }}>Send notification</button>
                  </div>
                )
              ))}
              <h1 style={{ color: '#007BFF', marginBottom: '20px', marginTop: '40px' }}>Send notification to multiple users</h1>
              {users.map((option) => (
                option.isAdmin === "true" ? null : (
                  <label key={option.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <input
                      type="checkbox"
                      value={option.id}
                      checked={selectedValues.includes(option.id)}
                      onChange={handleChange}
                      style={{ marginRight: '5px' }}
                    />
                    {option.name}
                  </label>
                )
              ))}
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" style={{ marginBottom: '5px', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" style={{ marginBottom: '5px', padding: '5px', borderRadius: '3px', border: '1px solid #ddd' }} />
              <br/>
              <button onClick={handleMulNot} style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer', border: 'none', marginBottom: '10px' }}>Send notification</button>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', textAlign: 'center' }}>
              <p>No users found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
  
  

}

export default UserProfile;
