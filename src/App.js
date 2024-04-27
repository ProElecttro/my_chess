import React, { useEffect, useMemo, useState } from 'react'
import Game from './game';
import HomePage from './HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [roomCode, setRoomCode] = useState("")

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage roomCode={roomCode} setRoomCode={setRoomCode} />} />
        <Route path='/game' element={<Game roomCode={roomCode} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;