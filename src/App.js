import {useState} from "react"

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board() {
  const [sqaures, setSquares] = useState(Array(9).fill(null))
  
  function handleClick(i) {
    const newSquares = sqaures.slice()
    newSquares[i] = "X"
    setSquares(newSquares)
  }
  return (
    <div>
      <div className="board-row">
        <Square value={sqaures[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={sqaures[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={sqaures[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={sqaures[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={sqaures[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={sqaures[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={sqaures[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={sqaures[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={sqaures[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>
  );
}
