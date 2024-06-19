import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ roomCode, setRoomCode }) {
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    // Navigate to the game page with the entered room code
    navigate(`/game/${roomCode}`);
  };

  const handleGenerateRoomCode = () => {
    // Generate a random room code (you can implement your logic here)
    const generatedCode = generateRandomRoomCode(); // Implement this function
    setRoomCode(generatedCode);
    navigate(`/game/${generatedCode}`);
  };

  const generateRandomRoomCode = () => {
    // Example function to generate a random 6-character alphanumeric code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  return (
    <div className="homepage">
      <h1>Welcome to Chess Game</h1>
      <div className="join">
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
      <div className="or">
        <p>or</p>
      </div>
      <button onClick={handleGenerateRoomCode}>Generate Room Code</button>
    </div>
  );
}

export default HomePage;
