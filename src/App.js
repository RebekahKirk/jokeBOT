import React from 'react';
import ChatBot from 'react-simple-chatbot';
import './App.css';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <div className="bot">
      <Chat/>
      </div>
    </div>
  );
}

export default App;