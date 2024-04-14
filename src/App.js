import React, { useState } from 'react'
import './App.css';
import styles from './style.module.css';
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

function App() {
  let indices = [1, 2, 3, 4, 5, 6, 7, 8];
  let alphas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  let [whoseTurn, setWhoseTurn] = useState("white");

  const [blackKills, setBlackKills] = useState([]);
  const [whiteKills, setWhiteKills] = useState([]);

  let initial_positions = [
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

  let InitialHighLight = [
    ["gray", "white", "gray", "white", "gray", "white", "gray", "white"],
    ["white", "gray", "white", "gray", "white", "gray", "white", "gray"],
    ["gray", "white", "gray", "white", "gray", "white", "gray", "white"],
    ["white", "gray", "white", "gray", "white", "gray", "white", "gray"],
    ["gray", "white", "gray", "white", "gray", "white", "gray", "white"],
    ["white", "gray", "white", "gray", "white", "gray", "white", "gray"],
    ["gray", "white", "gray", "white", "gray", "white", "gray", "white"],
    ["white", "gray", "white", "gray", "white", "gray", "white", "gray"]
  ]

  const [highLight, setHighlight] = useState(InitialHighLight)


  const [positions, setPositions] = useState(initial_positions);
  const [pick, setPick] = useState([-1, -1]);

  const handleOnClick = (x, y) => {
    if (pick[0] === -1 && pick[1] === -1) {
      if(positions[x][y] && positions[x][y].color !== whoseTurn){
        alert(`${whoseTurn}'s turn`)
        return;
      }
      setPick([x, y]);
      let newHighlight = [...highLight];
      newHighlight[x][y] = "skyblue";
      setHighlight(newHighlight);
      bishop(x, y);
      pawn(x, y);
      rook(x, y);
      king(x, y);
      queen(x, y);
      knight(x, y);
    } else {
      if (highLight[x][y] !== "skyblue" && highLight[x][y] !== "red") return;
      const newPositions = [...positions];

      if (positions[x][y] && positions[x][y].color === positions[pick[0]][pick[1]].color) {
        setPick([-1, -1]);
        return;
      }

      if (positions[x][y] && positions[x][y].image) {
        if (whoseTurn === "black") {
          setBlackKills([...blackKills, positions[x][y].image]);
        } else {
          setWhiteKills([...whiteKills, positions[x][y].image]);
        }
      }      

      newPositions[x][y] = newPositions[pick[0]][pick[1]];
      newPositions[pick[0]][pick[1]] = null;

      setPositions(newPositions);
      setPick([-1, -1]);
      setHighlight(InitialHighLight);
      setWhoseTurn((whoseTurn === "white") ? "black" : "white");
  }
  };

  const rook = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "rook") {
      let newHighlight = [...highLight];
  
      // Highlight vertically downwards
      for (let i = x + 1; i < 8; i++) {
        if (positions[i][y]) {
          if (positions[x][y].color !== positions[i][y].color) {
            newHighlight[i][y] = "red"; // Highlight opponent's piece in red
          }
          break;
        }
        newHighlight[i][y] = "skyblue";
      }
      // Highlight vertically upwards
      for (let i = x - 1; i >= 0; i--) {
        if (positions[i][y]) {
          if (positions[x][y].color !== positions[i][y].color) {
            newHighlight[i][y] = "red"; // Highlight opponent's piece in red
          }
          break;
        }
        newHighlight[i][y] = "skyblue";
      }
  
      // Highlight horizontally to the right
      for (let j = y + 1; j < 8; j++) {
        if (positions[x][j]) {
          if (positions[x][y].color !== positions[x][j].color) {
            newHighlight[x][j] = "red"; // Highlight opponent's piece in red
          }
          break;
        }
        newHighlight[x][j] = "skyblue";
      }
      // Highlight horizontally to the left
      for (let j = y - 1; j >= 0; j--) {
        if (positions[x][j]) {
          if (positions[x][y].color !== positions[x][j].color) {
            newHighlight[x][j] = "red"; // Highlight opponent's piece in red
          }
          break;
        }
        newHighlight[x][j] = "skyblue";
      }
  
      setHighlight(newHighlight);
    }
  };  

  const knight = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "knight") {
      let newHighlight = [...highLight];

      // Possible knight moves
      const moves = [
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x - 2, y + 1],
        [x - 2, y - 1],
        [x + 1, y + 2],
        [x + 1, y - 2],
        [x - 1, y + 2],
        [x - 1, y - 2]
      ];

      // Highlight valid moves
      moves.forEach(([nx, ny]) => {
        if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
          if (!positions[nx][ny] || positions[x][y].color !== positions[nx][ny].color) {
            newHighlight[nx][ny] = "skyblue";
          }
        }
      });

      setHighlight(newHighlight);
    }
  };

  const king = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "king") {
      let newHighlight = [...highLight];

      // Possible king moves
      const moves = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
        [x + 1, y + 1],
        [x + 1, y - 1],
        [x - 1, y + 1],
        [x - 1, y - 1]
      ];

      // Highlight valid moves
      moves.forEach(([nx, ny]) => {
        if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
          if (!positions[nx][ny] || positions[x][y].color !== positions[nx][ny].color) {
            newHighlight[nx][ny] = "skyblue";
          }
        }
      });

      setHighlight(newHighlight);
    }
  };

  const queen = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "queen") {
      let newHighlight = [...highLight];

      // Highlight vertically
      for (let i = x + 1; i < 8; i++) {
        if (positions[i][y]) {
          if (positions[x][y].color !== positions[i][y].color) {
            newHighlight[i][y] = "skyblue";
          }
          break;
        }
        newHighlight[i][y] = "skyblue";
      }
      for (let i = x - 1; i >= 0; i--) {
        if (positions[i][y]) {
          if (positions[x][y].color !== positions[i][y].color) {
            newHighlight[i][y] = "skyblue";
          }
          break;
        }
        newHighlight[i][y] = "skyblue";
      }

      // Highlight horizontally
      for (let j = y + 1; j < 8; j++) {
        if (positions[x][j]) {
          if (positions[x][y].color !== positions[x][j].color) {
            newHighlight[x][j] = "skyblue";
          }
          break;
        }
        newHighlight[x][j] = "skyblue";
      }
      for (let j = y - 1; j >= 0; j--) {
        if (positions[x][j]) {
          if (positions[x][y].color !== positions[x][j].color) {
            newHighlight[x][j] = "skyblue";
          }
          break;
        }
        newHighlight[x][j] = "skyblue";
      }

      // Highlight diagonally
      for (let i = 1; i < 8; i++) {
        if (x + i < 8 && y + i < 8) {
          if (!positions[x + i][y + i] || positions[x][y].color !== positions[x + i][y + i].color) {
            newHighlight[x + i][y + i] = "skyblue";
          }
          if (positions[x + i][y + i]) break;
        }
        if (x + i < 8 && y - i >= 0) {
          if (!positions[x + i][y - i] || positions[x][y].color !== positions[x + i][y - i].color) {
            newHighlight[x + i][y - i] = "skyblue";
          }
          if (positions[x + i][y - i]) break;
        }
        if (x - i >= 0 && y + i < 8) {
          if (!positions[x - i][y + i] || positions[x][y].color !== positions[x - i][y + i].color) {
            newHighlight[x - i][y + i] = "skyblue";
          }
          if (positions[x - i][y + i]) break;
        }
        if (x - i >= 0 && y - i >= 0) {
          if (!positions[x - i][y - i] || positions[x][y].color !== positions[x - i][y - i].color) {
            newHighlight[x - i][y - i] = "skyblue";
          }
          if (positions[x - i][y - i]) break;
        }
      }

      setHighlight(newHighlight);
    }
  };

  const bishop = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "bishop") {
      let newHighlight = [...highLight];

      // Highlight diagonally
      for (let i = 1; i < 8; i++) {
        if (x + i < 8 && y + i < 8) {
          if (!positions[x + i][y + i]) {
            newHighlight[x + i][y + i] = "skyblue";
          } else {
            if (positions[x][y].color !== positions[x + i][y + i].color) {
              newHighlight[x + i][y + i] = "skyblue";
            }
            break;
          }
        }
        if (x + i < 8 && y - i >= 0) {
          if (!positions[x + i][y - i]) {
            newHighlight[x + i][y - i] = "skyblue";
          } else {
            if (positions[x][y].color !== positions[x + i][y - i].color) {
              newHighlight[x + i][y - i] = "skyblue";
            }
            break;
          }
        }
        if (x - i >= 0 && y + i < 8) {
          if (!positions[x - i][y + i]) {
            newHighlight[x - i][y + i] = "skyblue";
          } else {
            if (positions[x][y].color !== positions[x - i][y + i].color) {
              newHighlight[x - i][y + i] = "skyblue";
            }
            break;
          }
        }
        if (x - i >= 0 && y - i >= 0) {
          if (!positions[x - i][y - i]) {
            newHighlight[x - i][y - i] = "skyblue";
          } else {
            if (positions[x][y].color !== positions[x - i][y - i].color) {
              newHighlight[x - i][y - i] = "skyblue";
            }
            break;
          }
        }
      }

      setHighlight(newHighlight);
    }
  };


  const pawn = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "pawn") {
      let newHighlight = [...highLight];
      if (positions[x][y].color === "black") {
        if (x + 1 < 8 && !positions[x + 1][y]) {
          newHighlight[x + 1][y] = "skyblue";
          if (x === 1 && !positions[x + 2][y]) {
            newHighlight[x + 2][y] = "skyblue";
          }
        }
        if (x + 1 < 8 && y + 1 < 8 && positions[x + 1][y + 1] && positions[x + 1][y + 1].color === "white") {
          newHighlight[x + 1][y + 1] = "skyblue";
        }
        if (x + 1 < 8 && y - 1 >= 0 && positions[x + 1][y - 1] && positions[x + 1][y - 1].color === "white") {
          newHighlight[x + 1][y - 1] = "skyblue";
        }
      } else {
        if (x - 1 >= 0 && !positions[x - 1][y]) {
          newHighlight[x - 1][y] = "skyblue";
          if (x === 6 && !positions[x - 2][y]) {
            newHighlight[x - 2][y] = "skyblue";
          }
        }
        if (x - 1 >= 0 && y + 1 < 8 && positions[x - 1][y + 1] && positions[x - 1][y + 1].color === "black") {
          newHighlight[x - 1][y + 1] = "skyblue";
        }
        if (x - 1 >= 0 && y - 1 >= 0 && positions[x - 1][y - 1] && positions[x - 1][y - 1].color === "black") {
          newHighlight[x - 1][y - 1] = "skyblue";
        }
      }
      setHighlight(newHighlight);
    }
  };





  return (
    <div className={styles.container}>
      <div className={styles.BlackKillBox}>
        {blackKills && blackKills.map((blackKill, index) => {
          return(
            <img src={blackKill} alt="+1" key={index} className={styles.kills}/>
          );
        })
        }
      </div>
      <div className={styles.chessBoard}>
        {indices.map((number) => {
          return (
            <div key={number} className={styles.rows}>
              {alphas.map((alpha) => {
                return (
                  <div
                    onClick={() => handleOnClick(indices.indexOf(number), alphas.indexOf(alpha))}
                    key={`${number}-${alpha}`}
                    className={styles.chessBox}
                    style={{
                      backgroundColor: highLight[indices.indexOf(number)][alphas.indexOf(alpha)]
                    }}
                  >
                    {positions[number - 1][alphas.indexOf(alpha)] &&
                      <img src={positions[number - 1][alphas.indexOf(alpha)].image} alt="hello" className={styles.piece} />
                    }
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={styles.WhiteKillBox}>
        {whiteKills && whiteKills.map((whiteKill, index) => {
          return(
            <img src={whiteKill} alt="+1" key={index} className={styles.kills}/>
          );
        })
        }
      </div>
    </div>
  );
}

export default App;