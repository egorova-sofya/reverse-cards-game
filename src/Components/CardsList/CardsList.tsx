import React, { FC } from "react";
import { Card } from "../../../types";
import CardItem from "./CardItem/CardItem";
import "./CardsList.css";
import Button from "../Button/Button";

interface Props {
  cardList: Card[];
  chosenCards: Card[];
  setChosenCards: (payload: Card[]) => void;
}

const CardsList: FC<Props> = ({ cardList, chosenCards, setChosenCards }) => {
  return (
    <div className="card-list__wrapper">
      <div className="topleftconcave"></div>
      <div className="botleftconcave"></div>

      <Button>New game</Button>
      <div className="card-list__grid">
        {cardList.map((item) => (
          <CardItem
            key={item.id}
            cardItem={item}
            cardList={cardList}
            chosenCards={chosenCards}
            setChosenCards={setChosenCards}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsList;
