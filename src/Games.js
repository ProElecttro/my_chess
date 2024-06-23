import React, { useState } from 'react';
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

function Game() {
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

  const handleCellClick = (x, y) => {
    const clickedPiece = positions[x][y];

    if (selectedCell.x === -1 && selectedCell.y === -1) {
      // No piece selected yet
      if (clickedPiece && clickedPiece.color === whoseTurn) {
        setSelectedCell({ x, y });
        highlightPossibleMoves(x, y);
      }
    } else {
      // Piece already selected
      if (clickedPiece && clickedPiece.color === whoseTurn) {
        // Select another piece of the same color
        setSelectedCell({ x, y });
        highlightPossibleMoves(x, y);
      } else if (highlightedCells[x][y]) {
        // Move to the highlighted cell (can be an empty cell or capturing an opponent piece)
        movePiece(selectedCell.x, selectedCell.y, x, y);
        clearHighlightedCells();
        setSelectedCell({ x: -1, y: -1 });
        switchTurn();
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
          newHighlightedCells[i][j] = "skyblue";
        }
      }
    });
  };

  const highlightBishopMoves = (x, y, newHighlightedCells) => {
    const pieceColor = positions[x][y].color;

    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      if (!positions[i][j]) {
        newHighlightedCells[i][j] = "skyblue";
      } else {
        if (positions[i][j].color !== pieceColor) {
          newHighlightedCells[i][j] = "red";
        }
        break;
      }
    }

    for (let i = x - 1, j = y + 1; i >= 0 && j < 8; i--, j++) {
      if (!positions[i][j]) {
        newHighlightedCells[i][j] = "skyblue";
      } else {
        if (positions[i][j].color !== pieceColor) {
          newHighlightedCells[i][j] = "red";
        }
        break;
      }
    }

    for (let i = x + 1, j = y - 1; i < 8 && j >= 0; i++, j--) {
      if (!positions[i][j]) {
        newHighlightedCells[i][j] = "skyblue";
      } else {
        if (positions[i][j].color !== pieceColor) {
          newHighlightedCells[i][j] = "red";
        }
        break;
      }
    }

    for (let i = x + 1, j = y + 1; i < 8 && j < 8; i++, j++) {
      if (!positions[i][j]) {
        newHighlightedCells[i][j] = "skyblue";
      } else {
        if (positions[i][j].color !== pieceColor) {
          newHighlightedCells[i][j] = "red";
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
          newHighlightedCells[i][j] = "skyblue";
        }
      }
    });
  };

  const highlightPawnMoves = (x, y, newHighlightedCells) => {
    const pieceColor = positions[x][y].color;
    const direction = pieceColor === "white" ? -1 : 1;
    const startRow = pieceColor === "white" ? 6 : 1;
    const opponentColor = pieceColor === "white" ? "black" : "white";

    if (x + direction >= 0 && x + direction < 8) {
      if (!positions[x + direction][y]) {
        newHighlightedCells[x + direction][y] = "skyblue";
        if (x === startRow && !positions[x + 2 * direction][y]) {
          newHighlightedCells[x + 2 * direction][y] = "skyblue";
        }
      }
    }

    if (x + direction >= 0 && x + direction < 8) {
      if (y > 0 && positions[x + direction][y - 1] && positions[x + direction][y - 1].color === opponentColor) {
        newHighlightedCells[x + direction][y - 1] = "red";
      }
      if (y < 7 && positions[x + direction][y + 1] && positions[x + direction][y + 1].color === opponentColor) {
        newHighlightedCells[x + direction][y + 1] = "red";
      }
    }
  };

  const movePiece = (fromX, fromY, toX, toY) => {
    const newPositions = positions.map(row => row.slice());
    const capturedPiece = newPositions[toX][toY];
    newPositions[toX][toY] = newPositions[fromX][fromY];
    newPositions[fromX][fromY] = null;
    setPositions(newPositions);

    // Update captured pieces
    if (capturedPiece) {
      if (capturedPiece.color === "white") {
        setCapturedWhitePieces([...capturedWhitePieces, capturedPiece]);
      } else if (capturedPiece.color === "black") {
        setCapturedBlackPieces([...capturedBlackPieces, capturedPiece]);
      }
    }
  };

  const switchTurn = () => {
    setWhoseTurn(prev => (prev === "white" ? "black" : "white"));
  };

  return (
    <div className={styles.game}>
      <div className={styles.capturedPieces}>
        <div className={styles.capturedPiecesList}>
          <ul>
          <h4>White Kills</h4>
            {capturedWhitePieces.map((piece, index) => (
              <li key={index} className={styles.kill}>
              <img src={piece.image} alt={piece.piece}/>
            </li>
            ))}
          </ul>
        </div>
        <div className={styles.board}>
          {positions.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`${styles.cell} ${highlightedCells[rowIndex][colIndex] === "skyblue"
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
                <img src={piece.image} alt={piece.piece}/>
              </li>
            ))}
          </ul>
        </div>

      </div>
      <div className={styles.turnIndicator}>
        Turn: {whoseTurn === "white" ? "White" : "Black"}
      </div>
    </div>
  );
}

export default Game;
