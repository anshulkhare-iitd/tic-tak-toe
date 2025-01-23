import { useState } from "react";

function Square({ value, onSquareClick, isWinningSquare }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{ backgroundColor: isWinningSquare ? "lightblue" : "" }}
    >
      {value}
    </button>
  );
}

export function Board({ onPlay, squares, xIsNext }) {
  const winningSquares = calculateWinner(squares);
  const winner = winningSquares ? squares[winningSquares[0]] : winningSquares;
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.filter((v) => !v).length === 0) {
    status = "It was a draw";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }
  return (
    <div>
      <div className="status">{status}</div>
      {Array(3)
        .fill(null)
        .map((_, i) => {
          return (
            <div className="board-row" key={i}>
              {Array(3)
                .fill()
                .map((_, j) => {
                  const index = i * 3 + j;
                  return (
                    <Square
                      key={index}
                      value={squares[index]}
                      onSquareClick={() => handleClick(index)}
                      isWinningSquare={winningSquares?.includes(index)}
                    />
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [movesInAscendingOrder, setMovesInAscendingOrder] = useState(true);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      const { row, column } = getMoveLocation(history, move);
      description = `Go to move #${move} (row: ${row}, col: ${column})`;
      if (move === history.length - 1) {
        return (
          <li key={move}>
            You are at move #{move} (row: {row}, col: {column})
          </li>
        );
      }
    } else {
      description = "Go to game Start";
    }
    if (move > 0 && move === history.length - 1) {
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board onPlay={handlePlay} squares={currentSquares} xIsNext={xIsNext} />
      </div>
      <div className="game-info">
        <button
          onClick={() => setMovesInAscendingOrder(!movesInAscendingOrder)}
        >
          {movesInAscendingOrder
            ? "Set to decending order"
            : "Set to ascending order"}
        </button>
        <ol>{movesInAscendingOrder ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

function getMoveLocation(history, move) {
  const currentSquares = history[move];
  const previousSquares = history[move - 1];
  let index;
  for (let i = 0; i < 9; i++) {
    if (!!currentSquares[i] && !previousSquares[i]) {
      index = i;
      break;
    }
  }
  const row = Math.floor(index / 3) + 1;
  const column = (index % 3) + 1;
  return {
    row,
    column,
  };
}
