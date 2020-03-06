import React, { useState, useRef, useEffect } from 'react'
import "./Game.scss"


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

const hasWinner = (values: number[]) => {
  for (const [a, b, c] of lines) {
    if (values[a]
      && values[a] === values[b]
      && values[b] === values[c]) return true;
  }
  return false;
};

const initialValues = Array(9).fill('');
const initialPlayer = 'X';
const initialWinner = '';

const Game: React.FC = () => {
  const [values, setValues] = useState(initialValues);
  const [player, setPlayer] = useState(initialPlayer);
  const [winner, setWinner] = useState(initialWinner);

  const render = useRef(true);

  useEffect(() => {
    if (render.current) {
      render.current = false;
      return;
    }

    if (hasWinner(values)) {
      setWinner(player);
      return;
    }

    setPlayer(player === 'X' ? 'O' : 'X');
  }, [values]);

  const play = (index: number) => {
    if (winner) return;
    if (values[index]) return;

    setValues(prevValues => prevValues.map((value, _index) => _index === index ? player : value));
  };

  const reset = () => {
    setValues(initialValues);
    setPlayer(initialPlayer);
    setWinner(initialWinner);
  };

  return (
    <>
      <div className="grids">
        {
          values.map((value, index) => (
            <div
              role="button"
              tabIndex={0}
              key={index}
              onClick={() => play(index)}
              onKeyPress={() => play(index)}
            >
              {value}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3>
          Player: {player}
          {winner && ` | The Winner is ${winner}`}
        </h3>
        <button
          type="button"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </>
  );
};



export default Game;