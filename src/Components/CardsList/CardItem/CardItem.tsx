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
    <div className="card-item__wrapper" onClick={cardClick}>
      <div
        className={`card-item-inner ${
          cardItem.isShowing ? "card-item__wrapper--active" : ""
        }`}
      >
        <div className="card-item-front"></div>
        <div className="card-item-back">
          <img
            className="card-item__img"
            src={cardItem.img}
            alt={cardItem.img}
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
