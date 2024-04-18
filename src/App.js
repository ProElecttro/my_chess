import React, { useEffect, useMemo, useState } from 'react'
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

import { io } from 'socket.io-client';

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

  const ENDPOINT =  "http://localhost:5000"
  
  const socket = useMemo(
    () =>
      io("http://localhost:5000"),
    []
  );  


  useEffect(() => {
    socket.on('connect', () => {
      console.log("Connected to server", socket.id);
    });
    
    socket.on("newStateReceived", ({ positions, whoseTurn }) => {
      setPositions(positions);
      setWhoseTurn((whoseTurn == "white") ? "black" : "white");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleOnClick = (x, y) => {
    if (pick[0] === -1 && pick[1] === -1) {
      if (positions[x][y] && positions[x][y].color !== whoseTurn) {
        alert(`${whoseTurn}'s turn`);
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
      if (x === pick[0] && y === pick[1]) {
        setPick([-1, -1]);
        setHighlight(InitialHighLight);
        return;
      }

      if (highLight[x][y] !== "skyblue" && highLight[x][y] !== "red") {
        setPick([-1, -1]);
        setHighlight(InitialHighLight);
        return;
      }

      if (positions[x][y] && positions[x][y].image) {
        if (whoseTurn === "black") {
          setBlackKills([...blackKills, positions[x][y].image]);
        } else {
          setWhiteKills([...whiteKills, positions[x][y].image]);
        }
      }

      const newPositions = [...positions];
      newPositions[x][y] = newPositions[pick[0]][pick[1]];
      newPositions[pick[0]][pick[1]] = null;

      setPositions(newPositions);
      setPick([-1, -1]);
      setHighlight(InitialHighLight);
      setWhoseTurn(whoseTurn === "white" ? "black" : "white");
      
      socket.emit("statechange", { positions, whoseTurn });

      if (positions[x][y] && positions[x][y].piece === "king") {
        alert(`${whoseTurn} won the match`);
        setHighlight(InitialHighLight);
        setPositions(initial_positions);
        setBlackKills([]);
        setWhiteKills([]);
        return;
      }
    }
  };

  const rook = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "rook") {
      let newHighlight = [...highLight];

      for (let i = x + 1; i < 8; i++) {
        if (positions[i][y]) {
          if (positions[x][y].color !== positions[i][y].color) {
            newHighlight[i][y] = "red";
          }
          break;
        }
        newHighlight[i][y] = "skyblue";
      }
      for (let i = x - 1; i >= 0; i--) {
        if (positions[i][y]) {
          if (positions[x][y].color !== positions[i][y].color) {
            newHighlight[i][y] = "red";
          }
          break;
        }
        newHighlight[i][y] = "skyblue";
      }

      for (let j = y + 1; j < 8; j++) {
        if (positions[x][j]) {
          if (positions[x][y].color !== positions[x][j].color) {
            newHighlight[x][j] = "red";
          }
          break;
        }
        newHighlight[x][j] = "skyblue";
      }
      for (let j = y - 1; j >= 0; j--) {
        if (positions[x][j]) {
          if (positions[x][y].color !== positions[x][j].color) {
            newHighlight[x][j] = "red";
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

      moves.forEach(([nx, ny]) => {
        if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
          if (!positions[nx][ny]) {
            newHighlight[nx][ny] = "skyblue";
          } else if (positions[nx][ny] && positions[x][y].color !== positions[nx][ny].color) {
            newHighlight[nx][ny] = "red"
          }
        }
      });

      setHighlight(newHighlight);
    }
  };

  const king = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "king") {
      let newHighlight = [...highLight];

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

      moves.forEach(([nx, ny]) => {
        if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
          if (!positions[nx][ny]) {
            newHighlight[nx][ny] = "skyblue";
          } else if (positions[x][y].color !== positions[nx][ny].color) {
            newHighlight[nx][ny] = "red";
          }
        }
      });

      setHighlight(newHighlight);
    }
  };

  const queen = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "queen") {
      let newHighlight = [...highLight];


      for (let i = x + 1; i < 8; i++) {
        if (!positions[i][y]) {
          newHighlight[i][y] = "skyblue";
        } else if (positions[i][y].color !== positions[x][y].color) {
          newHighlight[i][y] = "red";
          break;
        } else {
          break;
        }
      }
      for (let i = x - 1; i >= 0; i--) {
        if (!positions[i][y]) {
          newHighlight[i][y] = "skyblue";
        } else if (positions[i][y].color !== positions[x][y].color) {
          newHighlight[i][y] = "red";
          break;
        } else {
          break;
        }
      }
      for (let j = y + 1; j < 8; j++) {
        if (!positions[x][j]) {
          newHighlight[x][j] = "skyblue";
        } else if (positions[x][j].color !== positions[x][y].color) {
          newHighlight[x][j] = "red";
          break;
        } else {
          break;
        }
      }
      for (let j = y - 1; j >= 0; j--) {
        if (!positions[x][j]) {
          newHighlight[x][j] = "skyblue";
        } else if (positions[x][j].color !== positions[x][y].color) {
          newHighlight[x][j] = "red";
          break;
        } else {
          break;
        }
      }


      for (let i = 1; x + i < 8 && y + i < 8; i++) {
        if (!positions[x + i][y + i]) {
          newHighlight[x + i][y + i] = "skyblue";
        } else if (positions[x + i][y + i].color !== positions[x][y].color) {
          newHighlight[x + i][y + i] = "red";
          break;
        } else {
          break;
        }
      }
      for (let i = 1; x + i < 8 && y - i >= 0; i++) {
        if (!positions[x + i][y - i]) {
          newHighlight[x + i][y - i] = "skyblue";
        } else if (positions[x + i][y - i].color !== positions[x][y].color) {
          newHighlight[x + i][y - i] = "red";
          break;
        } else {
          break;
        }
      }
      for (let i = 1; x - i >= 0 && y + i < 8; i++) {
        if (!positions[x - i][y + i]) {
          newHighlight[x - i][y + i] = "skyblue";
        } else if (positions[x - i][y + i].color !== positions[x][y].color) {
          newHighlight[x - i][y + i] = "red";
          break;
        } else {
          break;
        }
      }
      for (let i = 1; x - i >= 0 && y - i >= 0; i++) {
        if (!positions[x - i][y - i]) {
          newHighlight[x - i][y - i] = "skyblue";
        } else if (positions[x - i][y - i].color !== positions[x][y].color) {
          newHighlight[x - i][y - i] = "red";
          break;
        } else {
          break;
        }
      }

      setHighlight(newHighlight);
    }
  };

  const bishop = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "bishop") {
      let newHighlight = [...highLight];


      for (let i = 1; x + i < 8 && y + i < 8; i++) {
        if (!positions[x + i][y + i]) {
          newHighlight[x + i][y + i] = "skyblue";
        } else if (positions[x + i][y + i].color !== positions[x][y].color) {
          newHighlight[x + i][y + i] = "red";
          break;
        } else {
          break;
        }
      }


      for (let i = 1; x + i < 8 && y - i >= 0; i++) {
        if (!positions[x + i][y - i]) {
          newHighlight[x + i][y - i] = "skyblue";
        } else if (positions[x + i][y - i].color !== positions[x][y].color) {
          newHighlight[x + i][y - i] = "red";
          break;
        } else {
          break;
        }
      }


      for (let i = 1; x - i >= 0 && y + i < 8; i++) {
        if (!positions[x - i][y + i]) {
          newHighlight[x - i][y + i] = "skyblue";
        } else if (positions[x - i][y + i].color !== positions[x][y].color) {
          newHighlight[x - i][y + i] = "red";
          break;
        } else {
          break;
        }
      }


      for (let i = 1; x - i >= 0 && y - i >= 0; i++) {
        if (!positions[x - i][y - i]) {
          newHighlight[x - i][y - i] = "skyblue";
        } else if (positions[x - i][y - i].color !== positions[x][y].color) {
          newHighlight[x - i][y - i] = "red";
          break;
        } else {
          break;
        }
      }

      setHighlight(newHighlight);
    }
  };

  const pawn = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "pawn") {
      let newHighlight = [...highLight];
      const color = positions[x][y].color;
      const direction = (color === "white") ? -1 : 1;
      const startingRow = (color === "white") ? 6 : 1;


      if (x + direction >= 0 && x + direction < 8 && !positions[x + direction][y]) {
        newHighlight[x + direction][y] = "skyblue";
      }


      if (x === startingRow && !positions[x + direction][y] && !positions[x + 2 * direction][y]) {
        newHighlight[x + 2 * direction][y] = "skyblue";
      }


      if (x + direction >= 0 && x + direction < 8 && y - 1 >= 0 && positions[x + direction][y - 1] && positions[x + direction][y - 1].color !== color) {
        newHighlight[x + direction][y - 1] = "red";
      }


      if (x + direction >= 0 && x + direction < 8 && y + 1 < 8 && positions[x + direction][y + 1] && positions[x + direction][y + 1].color !== color) {
        newHighlight[x + direction][y + 1] = "red";
      }

      setHighlight(newHighlight);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.BlackKillBox}>
        {blackKills && blackKills.map((blackKill, index) => {
          return (
            <img src={blackKill} alt="+1" key={index} className={styles.kills} />
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
          return (
            <img src={whiteKill} alt="+1" key={index} className={styles.kills} />
          );
        })
        }
      </div>
    </div>
  );
}

export default App;