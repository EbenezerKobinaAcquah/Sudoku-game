import React, { useState } from "react";
import "./App.css";

const SudokuCell = ({ value, onChange }) => {
  const handleChange = (event) => {
    const newValue = parseInt(event.target.value) || "";
    onChange(newValue);
  };

  return (
    <input
      type="number"
      min="1"
      max="9"
      value={value}
      onChange={handleChange}
    />
  );
};

const checkRow = (row) => {
  const set = new Set();
  for (let i = 0; i < row.length; i++) {
    const value = row[i];
    if (set.has(value)) {
      return false;
    } else if (value !== null) {
      set.add(value);
    }
  }
  return true;
};

const checkColumn = (board, columnIndex) => {
  const set = new Set();
  for (let i = 0; i < board.length; i++) {
    const value = board[i][columnIndex];
    if (set.has(value)) {
      return false;
    } else if (value !== null) {
      set.add(value);
    }
  }
  return true;
};

const checkRegion = (board, rowIndex, columnIndex) => {
  const set = new Set();
  const rowStart = Math.floor(rowIndex / 3) * 3;
  const colStart = Math.floor(columnIndex / 3) * 3;
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      const value = board[i][j];
      if (set.has(value)) {
        return false;
      } else if (value !== null) {
        set.add(value);
      }
    }
  }
  return true;
};

const checkBoard = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (!checkRow(board[i])) {
      return false;
    }
  }
  for (let i = 0; i < board[0].length; i++) {
    if (!checkColumn(board, i)) {
      return false;
    }
  }
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      if (!checkRegion(board, i, j)) {
        return false;
      }
    }
  }
  return true;
};

const App = () => {
  const [board, setBoard] = useState([
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ]);

  const handleCellChange =  (rowIndex, columnIndex, newValue) => {
    const newBoard = [...board];
    newBoard[rowIndex][columnIndex] = newValue;
    setBoard(newBoard);
    };
    
    const handleCheck = () => {
    if (checkBoard(board)) {
    alert("Congratulations! You solved the Sudoku puzzle!");
    } else {
    alert("Sorry, the Sudoku puzzle is not solved correctly.");
    }
    };
    
    return (
    <div className="App">
    <h1>Sudoku Game</h1>
    <div className="Board">
    {board.map((row, rowIndex) => (
    <div className="Row" key={rowIndex}>
    {row.map((value, columnIndex) => (
    <SudokuCell
    key={'${rowIndex}-${columnIndex}'}
    value={value}
    onChange={(newValue) =>
    handleCellChange(rowIndex, columnIndex, newValue)
    }
    />
    ))}
    </div>
    ))}
    </div>
    <button onClick={handleCheck}>Check</button>
    </div>
    );
    };

    export default App;
