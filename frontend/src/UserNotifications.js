import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserNotifications(props) {
  const [history, setHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [sub, setSub] = useState(false);

  const handleToken = async () => {
    try {
      handleNotifactionsHistory();
      handleNotifactions();
    }catch (error) {       
      console.error('Error getting menu:', error);
      }
  }

  const handleNotifactionsHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/notifications/users/${props.id}/history`);
      console.log('History:', response.data.notifications);
      setHistory(response.data.notifications)
    }catch (error) {
        console.error('Error getting notifications:', error);
      }
  }

  const handleNotifactions = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${props.id}/notifications`);
      console.log('Notifications:', response.data.notifications);
      setNotifications(response.data.notifications)
    }catch (error) {
        console.error('Error getting notifications:', error);
      }
  }

  const handleRead = async (id) => {
    try {
      const response = await axios.put(`http://localhost:7000/notifications/${id}/read`);
      console.log('Status changed:', response.data);
      handleNotifactions();
    } catch (error) {
      console.error('Error changing password:', error);

    }
  }

  const handleUnRead = async (id) => {
    try {
      const response = await axios.put(`http://localhost:7000/notifications/${id}/unread`);
      console.log('Status changed:', response.data);
      handleNotifactions();
    } catch (error) {
      console.error('Error changing password:', error);

    }
  }

  const handleSub = async () => {
    try {
      const response = await axios.post("http://localhost:7000/notifications/subscribe", {
        user_id: props.id
      });
      console.log('User subsribed:', response.data);
      setSub(true);
    } catch (error) {
      console.error('Error subscribing:', error);

    }
  }

  const handleUnSub = async () => {
    try {
      const response = await axios.delete("http://localhost:7000/notifications/unsubscribe", {
        data: {
          user_id: props.id
        }
      });
      console.log('User unsubsribed:', response.data);
      setSub(false);
    } catch (error) {
      console.error('Error unsubscribing:', error);

    }
  }

  useEffect(() => {
    handleToken();
  },[]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <h1 style={{ color: '#007BFF', marginBottom: '20px' }}>Notifications</h1>
      {sub ? (
        <button style={{ textDecoration: 'none', color: '#333', padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer' }} onClick={handleUnSub}>Unsubscribe!!!!</button>
      ) : (
        <button style={{ textDecoration: 'none', color: '#333', padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer' }} onClick={handleSub}>Subscribe!!!!</button>
      )}
      <br />
      <h1 style={{ color: '#007BFF', marginBottom: '20px' }}>Unread Notifications</h1>
      <div>
        {notifications.length > 0 ? (
          <>
            {notifications.map(item => (
              item.status === 'unread' && (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', marginBottom: '10px' }}>
                  <h2 style={{ marginBottom: '10px' }}>{item.title}</h2>
                  <h2 style={{ marginBottom: '10px' }}>{item.message}</h2>
                  <h2 style={{ marginBottom: '10px' }}>{item.status}</h2>
                  <button style={{ textDecoration: 'none', color: '#333', padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer' }} onClick={() => handleRead(item.id)}>Mark as read</button>
                </div>
              )
            ))}
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', textAlign: 'center' }}>
            <p>No unread notifications found.</p>
          </div>
        )}
      </div>
      <h1 style={{ color: '#007BFF', marginBottom: '20px' }}>History</h1>
      <div>
        {history.length > 0 ? (
          <>
            {history.map(item => (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', marginBottom: '10px' }}>
                <h2 style={{ marginBottom: '10px' }}>{item.title}</h2>
                <h2 style={{ marginBottom: '10px' }}>{item.message}</h2>
                <button style={{ textDecoration: 'none', color: '#333', padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', cursor: 'pointer' }} onClick={() => handleUnRead(item.id)}>Mark as unread</button>
              </div>
            ))}
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', textAlign: 'center' }}>
            <p>No history found.</p>
          </div>
        )}
      </div>
    </div>
  );
  
  

}

export default UserNotifications;
