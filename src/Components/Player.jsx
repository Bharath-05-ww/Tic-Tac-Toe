import { useState } from "react";
export default function Player({
  initialname,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialname);
  const [isEditing, setisEditing] = useState(false);
  function handleclick() {
    setisEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editableplayername = <span className="player-name">{playerName}</span>;
  let button = "Edit";
  if (isEditing) {
    editableplayername = (
      <input type="text" value={playerName} onChange={handleChange}></input>
    );
    button = "Save";
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editableplayername}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => handleclick()}>{button}</button>
    </li>
  );
}
