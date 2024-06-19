import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Game.module.css'; // Importing CSS module for styling
import io from 'socket.io-client';

import black_pawn from './assets/black_pieces/pawn.png'; // Importing images for black pieces
import white_pawn from './assets/white_pieces/pawn.png'; // Importing images for white pieces
import white_rook from './assets/white_pieces/rook.png';
import black_rook from './assets/black_pieces/rook.png';
import white_bishop from './assets/white_pieces/bishop.png';
import black_bishop from './assets/black_pieces/bishop.png';
import white_king from './assets/white_pieces/king.png';
import black_king from './assets/black_pieces/king.png';
import white_queen from './assets/white_pieces/queen.png';
import black_queen from './assets/black_pieces/queen.png';
import white_knight from './assets/white_pieces/knight.png';
import black_knight from './assets/black_pieces/knight.png';

// Define initial positions and highlight for the chessboard
const initialPositions = [
  [
    { piece: "rook", image: black_rook, owner: "black" },
    { piece: "knight", image: black_knight, owner: "black" },
    { piece: "bishop", image: black_bishop, owner: "black" },
    { piece: "queen", image: black_queen, owner: "black" },
    { piece: "king", image: black_king, owner: "black" },
    { piece: "bishop", image: black_bishop, owner: "black" },
    { piece: "knight", image: black_knight, owner: "black" },
    { piece: "rook", image: black_rook, owner: "black" },
  ],
  [
    { piece: "pawn", image: black_pawn, owner: "black" },
    { piece: "pawn", image: black_pawn, owner: "black" },
    { piece: "pawn", image: black_pawn, owner: "black" },
    { piece: "pawn", image: black_pawn, owner: "black" },
    { piece: "pawn", image: black_pawn, owner: "black" },
    { piece: "pawn", image: black_pawn, owner: "black" },
    { piece: "pawn", image: black_pawn, owner: "black" },
    { piece: "pawn", image: black_pawn, owner: "black" }
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    { piece: "pawn", image: white_pawn, owner: "white" },
    { piece: "pawn", image: white_pawn, owner: "white" },
    { piece: "pawn", image: white_pawn, owner: "white" },
    { piece: "pawn", image: white_pawn, owner: "white" },
    { piece: "pawn", image: white_pawn, owner: "white" },
    { piece: "pawn", image: white_pawn, owner: "white" },
    { piece: "pawn", image: white_pawn, owner: "white" },
    { piece: "pawn", image: white_pawn, owner: "white" }
  ],
  [
    { piece: "rook", image: white_rook, owner: "white" },
    { piece: "knight", image: white_knight, owner: "white" },
    { piece: "bishop", image: white_bishop, owner: "white" },
    { piece: "queen", image: white_queen, owner: "white" },
    { piece: "king", image: white_king, owner: "white" },
    { piece: "bishop", image: white_bishop, owner: "white" },
    { piece: "knight", image: white_knight, owner: "white" },
    { piece: "rook", image: white_rook, owner: "white" }
  ]
];

const initialHighlight = [
  ["gray", "white", "gray", "white", "gray", "white", "gray", "white"],
  ["white", "gray", "white", "gray", "white", "gray", "white", "gray"],
  ["gray", "white", "gray", "white", "gray", "white", "gray", "white"],
  ["white", "gray", "white", "gray", "white", "gray", "white", "gray"],
  ["gray", "white", "gray", "white", "gray", "white", "gray", "white"],
  ["white", "gray", "white", "gray", "white", "gray", "white", "gray"],
  ["gray", "white", "gray", "white", "gray", "white", "gray", "white"],
  ["white", "gray", "white", "gray", "white", "gray", "white", "gray"]
];

const socket = io('http://localhost:8000');

const Game = () => {
  const location = useLocation();
  const [positions, setPositions] = useState(initialPositions);
  const [highlight, setHighlight] = useState(initialHighlight);

  useEffect(() => {
    if (location.state && location.state.roomId) {
      const { roomId } = location.state;

      // Event listener for moveMade
      socket.on('moveMade', ({ moves, highlight, board }) => {
        console.log('Move received:', moves);
        console.log('Highlight:', highlight);
        console.log('Updated board:', board);
        // Update positions and highlight state based on received data
        setPositions(board); // Update board positions
        setHighlight(highlight); // Update highlight
      });

      // Cleanup on component unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [location.state]);

  const handleOnClick = (rowIndex, colIndex) => {
    console.log(`Clicked on position ${rowIndex}-${colIndex}`);
    // Example logic to update positions (dummy logic)
    const updatedPositions = [...positions];
    updatedPositions[rowIndex][colIndex] = { piece: "pawn", image: white_pawn, owner: "white" }; // Example update
    setPositions(updatedPositions);

    if (location.state && location.state.roomId) {
      // Emit makeMove event with roomId, from, to, and playerName
      socket.emit('makeMove', location.state.roomId, `${rowIndex}-${colIndex}`, 'to', 'PlayerName'); // Replace 'PlayerName' with actual player name
    }
  };

  return (
    <div className={styles.container}>
      <p>Grandmaster's Arena</p>
      <div className={styles.chessContainer}>
        <div className={styles.BlackKillBox}>
          {/* Render black kills here */}
        </div>
        <div className={styles.chessBoard}>
          {positions.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.rows}>
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${styles.chessBox} ${highlight[rowIndex][colIndex] === 'gray' ? styles.grayBox : styles.whiteBox}`}
                  onClick={() => handleOnClick(rowIndex, colIndex)}
                >
                  {cell && <img src={cell.image} alt="piece" className={styles.piece} />}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.WhiteKillBox}>
          {/* Render white kills here */}
        </div>
      </div>
    </div>
  );
};

export default Game;
