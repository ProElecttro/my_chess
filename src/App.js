import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Games';
import HomePage from './HomePage';

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
