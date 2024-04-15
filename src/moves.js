import { positions, setPositions, highlight, setHighlight } from "./App";

const pawn = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "pawn") {
      let newHighlight = [...highLight];
      
      newHighlight[x + (positions[x][y].color === "black" ? 1 : -1)][y] = "skyblue";
      newHighlight[x + (positions[x][y].color === "black" ? 2 : -2)][y] = "skyblue";
      setHighlight(newHighlight);
    }
  };

  const rook = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "rook") {
      let newHighlight = [...highLight];
  
      
      for (let i = 0; i < 8; i++) {
        if (i !== x) {
          newHighlight[i][y] = "skyblue";
        }
      }

      for (let j = 0; j < 8; j++) {
        if (j !== y) {
          newHighlight[x][j] = "skyblue";
        }
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
          newHighlight[nx][ny] = "skyblue";
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
          newHighlight[nx][ny] = "skyblue";
        }
      });
  
      setHighlight(newHighlight);
    }
  };

  
  const queen = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "queen") {
      let newHighlight = [...highLight];
  

      for (let i = 0; i < 8; i++) {
        if (i !== x) {
          newHighlight[i][y] = "skyblue";
        }
      }
  

      for (let j = 0; j < 8; j++) {
        if (j !== y) {
          newHighlight[x][j] = "skyblue";
        }
      }
  

      for (let i = 1; i < 8; i++) {
        if (x + i < 8 && y + i < 8) {
          newHighlight[x + i][y + i] = "skyblue";
        }
        if (x + i < 8 && y - i >= 0) {
          newHighlight[x + i][y - i] = "skyblue";
        }
        if (x - i >= 0 && y + i < 8) {
          newHighlight[x - i][y + i] = "skyblue";
        }
        if (x - i >= 0 && y - i >= 0) {
          newHighlight[x - i][y - i] = "skyblue";
        }
      }
  
      setHighlight(newHighlight);
    }
  };

  const bishop = (x, y) => {
    if (positions[x][y] && positions[x][y].piece === "bishop") {
      let newHighlight = [...highLight];
  

      for (let i = 1; i < 8; i++) {
        if (x + i < 8 && y + i < 8) {
          newHighlight[x + i][y + i] = "skyblue";
        }
        if (x + i < 8 && y - i >= 0) {
          newHighlight[x + i][y - i] = "skyblue";
        }
        if (x - i >= 0 && y + i < 8) {
          newHighlight[x - i][y + i] = "skyblue";
        }
        if (x - i >= 0 && y - i >= 0) {
          newHighlight[x - i][y - i] = "skyblue";
        }
      }
  
      setHighlight(newHighlight);
    }
  };

export {pawn, rook, bishop, king, queen, knight}