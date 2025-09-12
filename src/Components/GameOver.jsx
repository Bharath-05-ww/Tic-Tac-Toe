export default function GameOver({ winner, onSelect }) {
  let win = <p>Match has Drawn</p>;
  if (winner) {
    win = <p>{winner} Won !</p>;
  }
  return (
    <div id="game-over">
      <h2>Game Over !</h2>
      <p>{win}</p>
      <p>
        <button onClick={onSelect}>Rematch</button>
      </p>
    </div>
  );
}