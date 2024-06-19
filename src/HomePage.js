import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ roomCode, setRoomCode }) {
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    // Navigate to the game page with the entered room code
    fetchData();
    navigate(`/game/${roomCode}`);
  };

  const handleGenerateRoomCode = () => {
    // Generate a random room code (you can implement your logic here)
    const generatedCode = generateRandomRoomCode();
    setRoomCode(generatedCode);
    navigate(`/game/${generatedCode}`);
  };

  const generateRandomRoomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  let url = 'http://ec2-13-232-79-219.ap-south-1.compute.amazonaws.com:8000/';
  const fetchData  = async ()=>{
    const response = await fetch(url);
    const data = await response.json();
    alert('connected to server', data);
    console.log("connected to server", data);
  }

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
