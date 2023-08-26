import React, { FC } from "react";
import CardItem from "./CardItem/CardItem";
import Button from "../Button/Button";
import "./CardsList.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const CardsList: FC = () => {
  const cards = useSelector((state: RootState) => state.commonSlice.finalCards);
  const level = useSelector((state: RootState) => state.commonSlice.level);

  return (
    <div className="card-list__wrapper">
      <Button className="card-list__new-game-button">New game</Button>

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
