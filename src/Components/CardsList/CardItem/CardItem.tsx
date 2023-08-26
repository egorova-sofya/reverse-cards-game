import React, { FC } from "react";
import { Card } from "../../../../types";
import "./CardItem.css";
import { useDispatch, useSelector } from "react-redux";
import { choseCard, setChosenCards } from "../../../app/commonSlice";
import { RootState } from "../../../app/store";

interface Props {
  card: Card;
}

const CardItem: FC<Props> = ({ card }) => {
  const dispatch = useDispatch();
  const chosenCards = useSelector(
    (state: RootState) => state.commonSlice.chosenCards
  );

  const cardClick = () => {
    if (chosenCards.length < 2) {
      dispatch(choseCard(card));
      dispatch(setChosenCards(card));
    }
  };

  return (
    <div
      className={`card-item__wrapper ${
        card.isGuessed ? "card-item__wrapper--guessed" : ""
      }`}
      onClick={cardClick}
    >
      <div
        className={`card-item-inner ${
          card.isShowing || card.isGuessed ? "card-item__wrapper--active" : ""
        } `}
      >
        <div className="card-item-front"></div>
        <div className="card-item-back">
          <img
            className="card-item__img"
            src={card.img}
            alt={card.img}
            width={50}
            height={50}
          />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
