import Player from "./Components/Player";
import Gameboard from "./Components/Gameboard";
import { useState } from "react";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./Components/Winningcombination";
import GameOver from "./Components/GameOver";
const array = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getActiveplayer(gameturn) {
  let currentplayer = "X";
  if (gameturn.length > 0 && gameturn[0].player == "X") {
    currentplayer = "O";
  }
  return currentplayer;
}

function App() {
  const [players, setPlayers] = useState({ X: "Player 1" , O: "Player 2" });
  const [gameturn, setgameturn] = useState([]);
  const activeplayer = getActiveplayer(gameturn);

  let gameboard = array.map((row) => [...row]);
  for (const turn of gameturn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquare = gameboard[combinations[0].row][combinations[0].column];
    const secondSquare = gameboard[combinations[1].row][combinations[1].column];
    const thirdSquare = gameboard[combinations[2].row][combinations[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }
  const hasdraw = gameturn.length === 9 && !winner;

  function handleselectsquare(rowIndex, colIndex) {
    setgameturn((prevgameboard) => {
      const activeplayer = getActiveplayer(prevgameboard);
      const updatedboard = [
        { square: { row: rowIndex, col: colIndex }, player: activeplayer },
        ...prevgameboard,
      ];
      return updatedboard;
    });
  }
  function handlerestart() {
    setgameturn([]);
  }
  function handleplayernamechange(symbol, newname) {
    setPlayers((prevplayers) => {
      return { ...prevplayers, [symbol]: newname };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialname="Player 1"
            symbol="X"
            isActive={activeplayer === "X"}
            onChangeName={handleplayernamechange}
          />
          <Player
            initialname="Player 2"
            symbol="O"
            isActive={activeplayer === "O"}
            onChangeName={handleplayernamechange}
          />
        </ol>

        {(winner || hasdraw) && (
          <GameOver winner={winner} onSelect={handlerestart} />
        )}
        <Gameboard onSelect={handleselectsquare} turns={gameboard} />
        <Log turns={gameturn} />
      </div>
    </main>
  );
}

export default App;
