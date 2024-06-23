import React, { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Game from './Games';

function App() {
  const [roomCode, setRoomCode] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage roomCode={roomCode} setRoomCode={setRoomCode}/>} />
        <Route path="/game/:roomId" element={<Game/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;