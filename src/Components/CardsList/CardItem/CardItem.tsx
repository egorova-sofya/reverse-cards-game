import React, { FC } from "react";
import { Card } from "../../../../types";
import "./CardItem.css";

interface Props {
  cardItem: Card;
  cardList: Card[] | [];
  chosenCards: Card[];
  setChosenCards: (payload: Card[]) => void;
}

const CardItem: FC<Props> = ({
  cardItem,
  cardList,
  chosenCards,
  setChosenCards,
}) => {
  const cardClick = () => {
    cardList.map((item) => {
      if (item.id === cardItem.id) {
        setChosenCards([...chosenCards, item]);
      }
    });
  };

  return (
    <>
      <div
        className={`card-item__wrapper ${
          cardItem.isShowing ? "card-item__wrapper--active" : ""
        }`}
        onClick={cardClick}
      >
        {cardItem.isShowing && (
          <img
            className="card-item__img"
            src={cardItem.img}
            alt={cardItem.title}
            width={50}
            height={50}
          />
        )}
      </div>
    </>
  );
};

export default CardItem;
