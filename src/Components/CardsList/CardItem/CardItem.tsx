import React, { FC } from "react";
import { Card } from "../../../../types";
import "./CardItem.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { setChosenCards } from "../../../app/commonSlice";

interface Props {
  cardItem: Card;
  cards: Card[];
}

const CardItem: FC<Props> = ({ cardItem, cards }) => {
  const chosenCards = useSelector(
    (state: RootState) => state.commonSlice.chosenCards
  );
  const dispatch = useDispatch();
  const cardClick = () => {
    if (!cardItem.isGuessed && !cardItem.isShowing && chosenCards.length <= 2) {
      cards.map((item) => {
        if (item.id === cardItem.id) {
          dispatch(setChosenCards(item));
        }
      });
    }
  };

  return (
    <div className="card-item__wrapper" onClick={cardClick}>
      <div
        // className={`card-item-inner ${
        //   cardItem.isShowing ? "card-item__wrapper--active" : ""
        // }`}
        className={`card-item-inner ${"card-item__wrapper--active"}`}
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
