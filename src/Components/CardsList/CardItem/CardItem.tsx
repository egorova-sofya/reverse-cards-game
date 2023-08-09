import React, { FC } from "react";
import { Card } from "../../../../types";
import "./CardItem.css";

interface Props {
  cardItem: Card;
  cardList: Card[];
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
    if (!cardItem.isGuessed && !cardItem.isShowing && chosenCards.length <= 2) {
      cardList.map((item) => {
        if (item.id === cardItem.id) {
          setChosenCards([...chosenCards, item]);
        }
      });
    }
  };

  return (
    <div
      className={`card-item__wrapper ${
        // cardItem.isShowing ? "card-item__wrapper--active" : ""
        true ? "card-item__wrapper--active" : ""
      }`}
      style={
        cardItem.isGuessed ? { opacity: 0, cursor: "default" } : { opacity: 1 }
      }
      onClick={cardClick}
    >
      {/* {cardItem.isShowing && ( */}
      <img
        className="card-item__img"
        src={cardItem.img}
        alt={cardItem.title}
        width={50}
        height={50}
      />
      {/* )} */}
    </div>
  );
};

export default CardItem;
