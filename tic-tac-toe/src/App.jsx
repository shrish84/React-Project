import Player from "./Components/Player";
import Gameboard from "./Components/Gameboard";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./Components/WinningCombinations";
import GameOver from "./Components/GameOver";
import { useState } from "react";

function deriveWinner(gameBoard,players){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol= gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol= gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol= gameBoard[combination[2].row][combination[2].column];
    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner= players[firstSquareSymbol];//property name stored in square brackets
    }
  }
  return winner;
}
function deriveGameBoard(gameTurns){
  const initialGameBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null],
  ];
  let gameBoard= [...initialGameBoard.map((array)=>[...array])];//deep copy of inner array not just the outer elements
  for(const turn of gameTurns){
    const{square, player}= turn;
    const{row, col}= square;
    gameBoard[row][col]= player; 
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");
  const[players,setPlayers]= useState({
    X:'Player 1',
    O:'Player 2',
  })

  const handleSelectSquare = (rowIndex, colIndex) => {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      //if the lastest turn i.e. prevTurns[0] is x
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };
  const gameBoard= deriveGameBoard(gameTurns);
  const winner= deriveWinner(gameBoard, players);
  const draw= !winner && gameTurns.length===9;

  const handleRematch=()=>{
    setGameTurns([]);
  }

  const handlePlayerNameChange=(symbol, newName)=>{
      setPlayers(prevPlayers=>{
        return{
          ...prevPlayers,//spread operator copies all the value from old obj and gives it to new one
          [symbol]: newName,//override the name of the symbol which is changing, square bracket access old property and change it's value acc to the newName
        }
      }
      )
  }//The function updates the state immutably, meaning it creates a new state object rather than modifying the existing one.
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player symbol="X" name="Player 1" isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}/>
          <Player symbol="O" name="Player 2" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner||draw) && <GameOver winner={winner} onRematch={handleRematch}></GameOver>}
        <Gameboard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>  );
}

export default App;
