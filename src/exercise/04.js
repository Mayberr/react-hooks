// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils.js'

function Board({selectSquare,squares}) {

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {

  const [currentSquares, setCurrentSquares] = useLocalStorageState('squares',Array(9).fill(null))
  const [history, setHistory] = useLocalStorageState('history',[Array(9).fill(null)])

  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status  = calculateStatus(winner, currentSquares ,nextValue)
  const currentMoveIndex = calculateMoveIndex(currentSquares)

  function selectSquare(square) {
   
    if (currentSquares[square] || winner) {
      return
    }

    const squaresCopy = [...currentSquares]
    const historyCopy = [...history]
    squaresCopy[square] = nextValue
    historyCopy[currentMoveIndex + 1] = squaresCopy
    setHistory(historyCopy.slice(0,currentMoveIndex + 2))
    setCurrentSquares(squaresCopy)
  }
 
  const moves = history.map((squares,moveIndex) => {
    const desc = moveIndex === 0 ? 'Go to game start' : `Go to move #${moveIndex}`
    const isCurrentMoveIndex = moveIndex === currentMoveIndex
      return (
        <li key={moveIndex.toString()} >
          <button
            onClick={() => setCurrentSquares(squares)}
            disabled={isCurrentMoveIndex}>
            {desc} {isCurrentMoveIndex ? '(current)' : null}
          </button>
        </li>
      )
    }
  )
  
  function restart() {
    // 🐨 reset the squares
    setCurrentSquares(Array(9).fill(null))
    setHistory([Array(9).fill(null)])
  }

  return (
    <div className="game">
    <div className="game-board">
      <Board selectSquare={selectSquare} squares={currentSquares} />
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
    <div className="game-info">
      <div>{status}</div>
      <ol>{moves}</ol>
    </div>
  </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
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
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function calculateMoveIndex(squares) {
  return squares.filter(Boolean).length
}

function App() {
  return <Game />
}

export default App
