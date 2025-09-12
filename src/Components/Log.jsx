export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.row}${turn.col}`}>
          {turn.player} Selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  );
}