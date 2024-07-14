import React, { useEffect, useMemo, useState } from 'react';
import styles from './Game.module.css';
import black_pawn from './assets/black_pieces/pawn.png';
import white_pawn from './assets/white_pieces/pawn.png';
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
import io from 'socket.io-client';
import ChatBox from './ChatBox';

const move_self = "http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/move-self.mp3";
const capture = "http://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default/capture.mp3";
const moveSound = new Audio(move_self);
const captureSound = new Audio(capture);
const playMoveSound = () => {
  moveSound.play();
};

const playCaptureSound = () => {
  captureSound.play();
};

function Game() {
  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  const player = getCookie('color');

  const socket = useMemo(() => {
    console.log('Creating socket instance...');
    let url = 'http://ec2-13-232-79-219.ap-south-1.compute.amazonaws.com:8000/';
    // url = "http://localhost:8000/"
    return io(url);
  }, []);

  const initialPositions = [
    [
      { piece: "rook", image: black_rook, color: "black" },
      { piece: "knight", image: black_knight, color: "black" },
      { piece: "bishop", image: black_bishop, color: "black" },
      { piece: "queen", image: black_queen, color: "black" },
      { piece: "king", image: black_king, color: "black" },
      { piece: "bishop", image: black_bishop, color: "black" },
      { piece: "knight", image: black_knight, color: "black" },
      { piece: "rook", image: black_rook, color: "black" },
    ],
    [
      { piece: "pawn", image: black_pawn, color: "black" },
      { piece: "pawn", image: black_pawn, color: "black" },
      { piece: "pawn", image: black_pawn, color: "black" },
      { piece: "pawn", image: black_pawn, color: "black" },
      { piece: "pawn", image: black_pawn, color: "black" },
      { piece: "pawn", image: black_pawn, color: "black" },
      { piece: "pawn", image: black_pawn, color: "black" },
      { piece: "pawn", image: black_pawn, color: "black" }
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      { piece: "pawn", image: white_pawn, color: "white" },
      { piece: "pawn", image: white_pawn, color: "white" },
      { piece: "pawn", image: white_pawn, color: "white" },
      { piece: "pawn", image: white_pawn, color: "white" },
      { piece: "pawn", image: white_pawn, color: "white" },
      { piece: "pawn", image: white_pawn, color: "white" },
      { piece: "pawn", image: white_pawn, color: "white" },
      { piece: "pawn", image: white_pawn, color: "white" }
    ],
    [
      { piece: "rook", image: white_rook, color: "white" },
      { piece: "knight", image: white_knight, color: "white" },
      { piece: "bishop", image: white_bishop, color: "white" },
      { piece: "queen", image: white_queen, color: "white" },
      { piece: "king", image: white_king, color: "white" },
      { piece: "bishop", image: white_bishop, color: "white" },
      { piece: "knight", image: white_knight, color: "white" },
      { piece: "rook", image: white_rook, color: "white" }
    ]
  ];

  const [positions, setPositions] = useState(initialPositions);
  const [highlightedCells, setHighlightedCells] = useState(Array.from({ length: 8 }, () => Array(8).fill(null)));
  const [selectedCell, setSelectedCell] = useState({ x: -1, y: -1 });
  const [whoseTurn, setWhoseTurn] = useState("white");
  const [capturedWhitePieces, setCapturedWhitePieces] = useState([]);
  const [capturedBlackPieces, setCapturedBlackPieces] = useState([]);

  const [match, setMatch] = useState(true);

  useEffect(()=>{
    if(!match){
      setPositions(initialPositions);
      setHighlightedCells(Array.from({ length: 8 }, () => Array(8).fill(null)));
    }
  },[match])

  socket.on('makeMove', ({ fromCoord, toCoord }) => {
    let fromX = fromCoord.x;
    let fromY = fromCoord.y;
    let toX = toCoord.x;
    let toY = toCoord.y;

    const newPositions = positions.map(row => row.slice());
    const capturedPiece = newPositions[toX][toY];
    if(capturedPiece && capturedPiece.piece === "king"){
      alert((player === "white") ? "black" : "white" + " Won the Match!");
      // setMatch(false);
      return;
    }
    newPositions[toX][toY] = newPositions[fromX][fromY];
    newPositions[fromX][fromY] = null;
    setPositions(newPositions);

    if (capturedPiece) {
      playCaptureSound();
      if (capturedPiece.color === "white") {
        setCapturedWhitePieces([...capturedWhitePieces, capturedPiece]);
      } else if (capturedPiece.color === "black") {
        setCapturedBlackPieces([...capturedBlackPieces, capturedPiece]);
      }
    } else {
      playMoveSound();
    }

    setSelectedCell({ x: -1, y: -1 });
    switchTurn();
  })

  const handleCellClick = (x, y) => {
    const clickedPiece = positions[x][y];

    if (selectedCell.x === -1 && selectedCell.y === -1) {
      if (clickedPiece && player === whoseTurn && clickedPiece.color === whoseTurn) {
        setSelectedCell({ x, y });
        highlightPossibleMoves(x, y);
      }
    } else {
      if (clickedPiece && player === whoseTurn && clickedPiece.color === whoseTurn) {
        setSelectedCell({ x, y });
        highlightPossibleMoves(x, y);
      } else if (highlightedCells[x][y]) {
        movePiece(selectedCell.x, selectedCell.y, x, y);
        clearHighlightedCells();
        setSelectedCell({ x: -1, y: -1 });
      } else {
        alert("Invalid move!");
      }
    }
  };

  const highlightPossibleMoves = (x, y) => {
    const newHighlightedCells = Array.from({ length: 8 }, () => Array(8).fill(null));
    newHighlightedCells[x][y] = "skyblue";

    if (!positions[x][y]) return;

    switch (positions[x][y].piece) {
      case "pawn":
        highlightPawnMoves(x, y, newHighlightedCells);
        break;
      case "rook":
        highlightRookMoves(x, y, newHighlightedCells);
        break;
      case "knight":
        highlightKnightMoves(x, y, newHighlightedCells);
        break;
      case "bishop":
        highlightBishopMoves(x, y, newHighlightedCells);
        break;
      case "queen":
        highlightQueenMoves(x, y, newHighlightedCells);
        break;
      case "king":
        highlightKingMoves(x, y, newHighlightedCells);
        break;
      default:
        break;
    }
    setHighlightedCells(newHighlightedCells);
  };

  const clearHighlightedCells = () => {
    setHighlightedCells(Array.from({ length: 8 }, () => Array(8).fill(null)));
  };

  const highlightRookMoves = (x, y, newHighlightedCells) => {
    const pieceColor = positions[x][y].color;
  
    // Vertical moves (up)
    for (let i = x - 1; i >= 0; i--) {
      if (!positions[i][y]) {
        newHighlightedCells[i][y] = "skyblue"; // Valid move
      } else {
        if (positions[i][y].color !== pieceColor) {
          newHighlightedCells[i][y] = "red"; // Capture move
        }
        break;
      }
    }
  
    // Vertical moves (down)
    for (let i = x + 1; i < 8; i++) {
      if (!positions[i][y]) {
        newHighlightedCells[i][y] = "skyblue"; // Valid move
      } else {
        if (positions[i][y].color !== pieceColor) {
          newHighlightedCells[i][y] = "red"; // Capture move
        }
        break;
      }
    }
  
    // Horizontal moves (left)
    for (let j = y - 1; j >= 0; j--) {
      if (!positions[x][j]) {
        newHighlightedCells[x][j] = "skyblue"; // Valid move
      } else {
        if (positions[x][j].color !== pieceColor) {
          newHighlightedCells[x][j] = "red"; // Capture move
        }
        break;
      }
    }
  
    // Horizontal moves (right)
    for (let j = y + 1; j < 8; j++) {
      if (!positions[x][j]) {
        newHighlightedCells[x][j] = "skyblue"; // Valid move
      } else {
        if (positions[x][j].color !== pieceColor) {
          newHighlightedCells[x][j] = "red"; // Capture move
        }
        break;
      }
    }
  };

  const highlightKnightMoves = (x, y, newHighlightedCells) => {
    const pieceColor = positions[x][y].color;
    const knightMoves = [
      [x - 2, y - 1],
      [x - 2, y + 1],
      [x - 1, y - 2],
      [x - 1, y + 2],
      [x + 1, y - 2],
      [x + 1, y + 2],
      [x + 2, y - 1],
      [x + 2, y + 1]
    ];
  
    knightMoves.forEach(([i, j]) => {
      if (i >= 0 && i < 8 && j >= 0 && j < 8) {
        if (!positions[i][j] || positions[i][j].color !== pieceColor) {
          newHighlightedCells[i][j] = !positions[i][j] ? "skyblue" : "red"; // Valid move or Capture move
        }
      }
    });
  };  

  const highlightBishopMoves = (x, y, newHighlightedCells) => {
    const pieceColor = positions[x][y].color;
  
    // Top-left diagonal
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      if (!positions[i][j]) {
        newHighlightedCells[i][j] = "skyblue"; // Valid move
      } else {
        if (positions[i][j].color !== pieceColor) {
          newHighlightedCells[i][j] = "red"; // Capture move
        }
        break;
      }
    }
  
    // Top-right diagonal
    for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
      if (!positions[i][j]) {
        newHighlightedCells[i][j] = "skyblue"; // Valid move
      } else {
        if (positions[i][j].color !== pieceColor) {
          newHighlightedCells[i][j] = "red"; // Capture move
        }
        break;
      }
    }
  
    // Bottom-left diagonal
    for (let i = x + 1, j = y - 1; i < 8 && j >= 0; i++, j--) {
      if (!positions[i][j]) {
        newHighlightedCells[i][j] = "skyblue"; // Valid move
      } else {
        if (positions[i][j].color !== pieceColor) {
          newHighlightedCells[i][j] = "red"; // Capture move
        }
        break;
      }
    }
  
    // Bottom-right diagonal
    for (let i = x + 1, j = y + 1; i < 8 && j < 8; i++, j++) {
      if (!positions[i][j]) {
        newHighlightedCells[i][j] = "skyblue"; // Valid move
      } else {
        if (positions[i][j].color !== pieceColor) {
          newHighlightedCells[i][j] = "red"; // Capture move
        }
        break;
      }
    }
  };  

  const highlightQueenMoves = (x, y, newHighlightedCells) => {
    highlightRookMoves(x, y, newHighlightedCells);
    highlightBishopMoves(x, y, newHighlightedCells);
  };  

  const highlightKingMoves = (x, y, newHighlightedCells) => {
    const pieceColor = positions[x][y].color;
    const kingMoves = [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1]
    ];
  
    kingMoves.forEach(([i, j]) => {
      if (i >= 0 && i < 8 && j >= 0 && j < 8) {
        if (!positions[i][j] || positions[i][j].color !== pieceColor) {
          newHighlightedCells[i][j] = !positions[i][j] ? "skyblue" : "red"; // Valid move or Capture move
        }
      }
    });
  };  

  const highlightPawnMoves = (x, y, newHighlightedCells) => {
    const pieceColor = positions[x][y].color;
    const direction = pieceColor === "white" ? -1 : 1;
    const startRow = pieceColor === "white" ? 6 : 1;
    const opponentColor = pieceColor === "white" ? "black" : "white";
  
    // Move one step forward
    if (x + direction >= 0 && x + direction < 8 && !positions[x + direction][y]) {
      newHighlightedCells[x + direction][y] = "skyblue";
  
      // Move two steps forward from starting row
      if (x === startRow && !positions[x + 2 * direction][y]) {
        newHighlightedCells[x + 2 * direction][y] = "skyblue";
      }
    }
  
    // Capture diagonally
    if (x + direction >= 0 && x + direction < 8) {
      if (y > 0 && positions[x + direction][y - 1] && positions[x + direction][y - 1].color === opponentColor) {
        newHighlightedCells[x + direction][y - 1] = "red";
      }
      if (y < 7 && positions[x + direction][y + 1] && positions[x + direction][y + 1].color === opponentColor) {
        newHighlightedCells[x + direction][y + 1] = "red";
      }
    }
  
    // En passant
    if (x === 3 && y > 0 && positions[x][y - 1] && positions[x][y - 1].color === opponentColor &&
        positions[x][y - 1].type === "pawn" && positions[x][y - 1].enPassantVulnerable) {
      newHighlightedCells[x + direction][y - 1] = "red";
    }
    if (x === 3 && y < 7 && positions[x][y + 1] && positions[x][y + 1].color === opponentColor &&
        positions[x][y + 1].type === "pawn" && positions[x][y + 1].enPassantVulnerable) {
      newHighlightedCells[x + direction][y + 1] = "red";
    }
  };
  
  const movePiece = (fromX, fromY, toX, toY) => {
    playCaptureSound();
    const newPositions = positions.map(row => row.slice());
    const capturedPiece = newPositions[toX][toY];
    if(capturedPiece && capturedPiece.piece === "king"){
      alert(player + " Won the Match!");
      socket.emit('movePiece', { from: { x: fromX, y: fromY }, to: { x: toX, y: toY } });
      setMatch(false);
      return;
    }
    newPositions[toX][toY] = newPositions[fromX][fromY];
    newPositions[fromX][fromY] = null;
    setPositions(newPositions);

    socket.emit('movePiece', { from: { x: fromX, y: fromY }, to: { x: toX, y: toY } });

    if (capturedPiece) {
      if (capturedPiece.color === "white") {
        setCapturedWhitePieces([...capturedWhitePieces, capturedPiece]);
      } else if (capturedPiece.color === "black") {
        setCapturedBlackPieces([...capturedBlackPieces, capturedPiece]);
      }
    } else {
      playMoveSound();
    }


    switchTurn();
  };

  const switchTurn = () => {
    if (whoseTurn === "black") {
      setWhoseTurn("white");
    } else {
      setWhoseTurn("black");
    }
  };

  return (
    <>
      <div className={styles.turnIndicator}>
        {whoseTurn === "white" ? "White" : "Black"}'s Turn
      </div>
      <div className={styles.game}>
        <ChatBox socket={socket} />
        <div className={styles.capturedPieces}>
          <div className={styles.capturedPiecesList}>
            <ul>
              <h4>White Kills</h4>
              {capturedWhitePieces.map((piece, index) => (
                <li key={index} className={styles.kill}>
                  <img src={piece.image} alt={piece.piece} />
                </li>
              ))}
            </ul>
          </div>
          <div className={player === 'white' ? styles.board : player === 'black' ? styles.reverseBoard : ''}>
            {positions.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.row}>
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`${player === 'white' ? styles.cell : styles.reverseCell} ${highlightedCells[rowIndex][colIndex] === "skyblue"
                      ? styles.highlighted
                      : highlightedCells[rowIndex][colIndex] === "red"
                        ? styles.capture
                        : ""
                      }`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell && <img src={cell.image} alt={cell.piece} />}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.capturedPiecesList}>
            <ul>
              <h4>Black Kills</h4>
              {capturedBlackPieces.map((piece, index) => (
                <li key={index} className={styles.kill}>
                  <img src={piece.image} alt={piece.piece} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
