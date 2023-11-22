import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/');
      console.log('Response:', response); // Log the response
      const data = response.data; // Access the response data directly
      console.log('Data:', data); // Log the data received
      setMessage(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Response from Spring Boot:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
