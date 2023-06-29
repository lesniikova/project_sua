import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserOrders(props) {
  const [orders, setOrders] = useState([]);

  const handleOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${props.id}/orders`);
      console.log('Orders:', response.data);
      setOrders(response.data)
    }catch (error) {
        console.error('Error getting menu:', error);
      }
  }

  const handleOrdersOrdered = async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders/ordered");
      console.log('Orders:', response.data);
      setOrders(response.data)
    }catch (error) {
        console.error('Error getting menu:', error);
      }
  }

  const handleOrdersCancelled= async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders/cancelled");
      console.log('Orders:', response.data);
      setOrders(response.data)
    }catch (error) {
        console.error('Error getting menu:', error);
      }
  }

  const handleOrdersConfirmed= async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders/confirmed");
      console.log('Orders:', response.data);
      setOrders(response.data)
    }catch (error) {
        console.error('Error getting menu:', error);
      }
  }

  const hadleDelete = async (orderId) => {

    try {
      const response = await axios.delete(`http://localhost:3000/orders/${orderId}`);
      console.log('Order deleted: ', response.data);
      handleOrders();
    }catch (error) {
        console.error('Error deleting menu:', error);
      }
  }

  const hadleCancel = async (orderId) => {

    try {
      const response = await axios.put(`http://localhost:3000/orders/${orderId}/cancel`);
      console.log('Order cancelled: ', response.data);
      handleOrdersOrdered();
    }catch (error) {
        console.error('Error cancelling order:', error);
      }
  }

  const hadleConfirm = async (orderId) => {

    try {
      const response = await axios.put(`http://localhost:3000/orders/${orderId}/confirm`);
      console.log('Order cancelled: ', response.data);
      handleOrdersOrdered();
    }catch (error) {
        console.error('Error confirming order:', error);
      }
  }


  useEffect(() => {
    handleOrders();
  },[]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa', overflow: 'auto' }}>
      <h1 style={{ color: '#007BFF', marginBottom: '20px' }}>User Orders</h1>
  
      {props.isAdmin === "true" ? (
        <>
          <div style={{ marginBottom: '10px' }}>
            Filter:
          </div>
          <button style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', marginBottom: '5px' }} onClick={handleOrdersOrdered}>Ordered</button>
          <br/>
          <button style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', marginBottom: '5px' }} onClick={handleOrdersConfirmed}>Confirmed</button>
          <br/>
          <button style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', marginBottom: '5px' }} onClick={handleOrdersCancelled}>Canceled</button>
          <br/>
        </>
      ) : null}
  
      <div style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', marginBottom: '10px' }}>
              <h2 style={{ marginBottom: '10px' }}>Order {order.id}</h2>
              <p>{order.name}</p>
              <p>{order.price}</p>
              <p>{order.status}</p>
              {props.isAdmin === "true" ? (
                order.status === "ordered" ? (
                  <>
                    <button style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', marginBottom: '5px' }} onClick={() => hadleCancel(order.id)}>Cancel order</button>
                    <br/>
                    <button style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', marginBottom: '5px' }} onClick={() => hadleConfirm(order.id)}>Confirm order</button>
                  </>
                ) : null
              ) : (
                <>
                  <button style={{ padding: '10px', borderRadius: '3px', backgroundColor: '#007BFF', color: '#ffffff', marginBottom: '5px' }} onClick={() => hadleDelete(order.id)}>Delete order</button>
                  <br/>
                </>
              )}
            </div>
          ))
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', textAlign: 'center' }}>
            {props.isAdmin === "true" ? <p>Filter orders by choice</p> : <p>No orders found.</p>}
          </div>
        )}
      </div>
    </div>
  );
  
  

}

export default UserOrders;
