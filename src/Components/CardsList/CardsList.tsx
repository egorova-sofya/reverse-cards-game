import React, { FC } from "react";
import { Card } from "../../../types";
import CardItem from "./CardItem/CardItem";
import Button from "../Button/Button";
import "./CardsList.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface Props {
  // cardList: Card[];
  // chosenCards: Card[];
  // setChosenCards: (payload: Card[]) => void;
}

const CardsList: FC<Props> = () => {
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
          <CardItem
            key={item.id}
            cardItem={item}
            cards={cards}
            // chosenCards={chosenCards}
            // setChosenCards={setChosenCards}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsList;
