import React, { useState } from 'react';
import styles from './Game.module.css'; // Importing CSS module for styling
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

const indices = [1, 2, 3, 4, 5, 6, 7, 8];
const alphas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const Game = () => {
  const [positions, setPositions] = useState(initialPositions);
  const [highLight, setHighLight] = useState(initialHighlight);

  // Function to handle click on a chess box
  const handleOnClick = (rowIndex, colIndex) => {
    // Implement logic to send move to backend and receive updated positions
    console.log(`Clicked on position ${rowIndex}-${colIndex}`);
    // Example logic to update positions (dummy logic)
    const updatedPositions = [...positions];
    updatedPositions[rowIndex][colIndex] = { piece: "pawn", image: white_pawn, owner: "white" }; // Example update
    setPositions(updatedPositions);
  };

  // Rendering the chessboard UI
  return (
    <div className={styles.container}>
      <p>Grandmaster's Arena</p>
      <div className={styles.chessContainer}>
        <div className={styles.BlackKillBox}>
          {/* Render black kills here */}
          {/* Example: <img src={blackKill} alt="+1" className={styles.kills} /> */}
        </div>
        <div className={styles.chessBoard}>
          {indices.map((number) => (
            <div key={number} className={styles.rows}>
              {alphas.map((alpha) => (
                <div
                  onClick={() => handleOnClick(indices.indexOf(number), alphas.indexOf(alpha))}
                  key={`${number}-${alpha}`}
                  className={`${styles.chessBox} ${highLight[indices.indexOf(number)][alphas.indexOf(alpha)] === "gray" ? styles.grayBox : styles.whiteBox}`}
                >
                  {positions[number - 1][alphas.indexOf(alpha)] &&
                    <img src={positions[number - 1][alphas.indexOf(alpha)].image} alt="piece" className={styles.piece} />
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.WhiteKillBox}>
          {/* Render white kills here */}
          {/* Example: <img src={whiteKill} alt="+1" className={styles.kills} /> */}
        </div>
      </div>
    </div>
  );
};

export default Game;
