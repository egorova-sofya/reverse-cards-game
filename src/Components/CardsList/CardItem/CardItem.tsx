import React, { FC } from "react";
import { Card } from "../../../../types";
import "./CardItem.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  checkChosenCards,
  choseCard,
  setChosenCards,
  // setChosenCards
} from "../../../app/commonSlice";

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
    dispatch(choseCard(cardItem));
    dispatch(setChosenCards(cardItem));
    setTimeout(() => {
      dispatch(checkChosenCards());
    }, 2500);
  };

  return (
    <div
      className={`card-item__wrapper ${
        cardItem.isGuessed ? "card-item__wrapper--guessed" : ""
      }`}
      onClick={cardClick}
    >
      <div
        className={`card-item-inner ${
          cardItem.isShowing || cardItem.isGuessed
            ? "card-item__wrapper--active"
            : ""
        } `}
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
