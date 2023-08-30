import React, { FC } from "react";
import CardItem from "./CardItem/CardItem";
import Button from "../Button/Button";
import "./CardsList.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import CircularProgress from "../CircularProgress/CircularProgress";

interface Props {
  startNewGame: () => void;
  waitingTime: number;
  loadMove: boolean;
}

const CardsList: FC<Props> = ({ startNewGame, waitingTime, loadMove }) => {
  const cards = useSelector((state: RootState) => state.commonSlice.finalCards);
  const level = useSelector((state: RootState) => state.commonSlice.level);

  return (
    <div className="card-list__wrapper">
      <Button onClick={startNewGame} className="card-list__new-game-button">
        New game
      </Button>
      {loadMove && (
        <CircularProgress
          value={waitingTime}
          className="card-list__circular-progress"
        />
      )}

      <div
        className="card-list__grid"
        style={{ gridTemplateColumns: `repeat(${level.columnQuantity}, 1fr)` }}
      >
        {cards.map((item) => (
          <CardItem key={item.id} card={item} />
        ))}
      </div>
    </div>
  );
};

export default CardsList;
