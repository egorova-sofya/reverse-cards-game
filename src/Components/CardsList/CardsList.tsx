import React, { FC } from "react";
import { Card } from "../../../types";
import CardItem from "./CardItem/CardItem";
import "./CardsList.css";

interface Props {
  cardList: Card[] | [];
  chosenCards: Card[];
  setChosenCards: (payload: Card[]) => void;
}

const CardsList: FC<Props> = ({ cardList, chosenCards, setChosenCards }) => {
  return (
    <>
      <div className="card-list__wrapper">
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
    </>
  );
};

export default CardsList;
