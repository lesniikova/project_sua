import React, { useEffect, useState } from "react";
import axios from 'axios';

const Logs = () => {

  const [lastCalled, setLastCalled] = useState('');
  const [mostPopular, setMostPopular] = useState('');
  const [allCalls, setAllCalls] = useState({});

  useEffect(() => {
    handleCall();
    handlePopular();
    handleAllCalls();
  }, []);


  const handleCall = async () => {
  
    try {
      const response = await axios.get('http://localhost:5050/zadnji-klic');
      console.log(response.data)
      setLastCalled(response.data) 
    } catch (error) {
      console.log('Call failed.', error);
    }
  };


  const handlePopular = async () => {
  
    try {
      const response = await axios.get('http://localhost:5050/najpogostejsi-klic');
      console.log(response.data)
      setMostPopular(response.data) 
    } catch (error) {
      console.log('Call failed.', error);
    }
  };

  const handleAllCalls = async () => {
  
    try {
      const response = await axios.get('http://localhost:5050/vsi-klici');
      console.log(response.data)
      setAllCalls(response.data) 
    } catch (error) {
      console.log('Call failed.', error);
    }
  };




  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ color: '#007BFF', marginBottom: '20px' }}>Calls on service Menu</h1>
      Vsi poklicani endpointi:
      {Object.keys(allCalls).map((key) => {
          return (
          <div key={key}>
            <b>{key}</b> : {allCalls[key]}
          </div>
        );
        })
      } 
      <br/><br/>
      {lastCalled}<br/><br/>
      {mostPopular}<br/>
      
    </div>
  );

}

export default Logs;