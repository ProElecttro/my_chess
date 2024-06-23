import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Games.js';
import HomePage from './HomePage.js';

function App() {
  const [roomCode, setRoomCode] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage roomCode={roomCode} setRoomCode={setRoomCode} />} />
        <Route path="/game/:roomId" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
