import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";
import { TURNS } from "./constants";
import { checkWinner } from "./logic/board";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);
  // null no hay ganador y false significa que hay un empate

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null);
  }

  const updatedBoard = (index) => {
    // Evita sobreescribir una casilla
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    console.log(newWinner);

    if (newWinner) {
      setWinner(newWinner);
      confetti()

    } else if (checkEndGame(newBoard)) {
      // Revisar si se ha acabado el juego (Empate)
      setWinner(false);
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }



  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reiniciar</button>

      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updatedBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
    </main>
  )
}

export default App
