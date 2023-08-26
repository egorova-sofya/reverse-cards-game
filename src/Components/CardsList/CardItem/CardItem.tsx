import React, { FC, useEffect } from "react";
import { Card } from "../../../../types";
import "./CardItem.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
  checkChosenCards,
  choseCard,
  setChosenCards,
} from "../../../app/commonSlice";

interface Props {
  card: Card;
}

const CardItem: FC<Props> = ({ card }) => {
  const chosenCards = useSelector(
    (state: RootState) => state.commonSlice.chosenCards
  );

  const dispatch = useDispatch();

  const cardClick = () => {
    dispatch(choseCard(card));
    dispatch(setChosenCards(card));
  };

  useEffect(() => {
    if (chosenCards.length == 2 && chosenCards[0].img == chosenCards[1].img) {
      setTimeout(() => {
        dispatch(checkChosenCards());
      }, 100);
    } else {
      setTimeout(() => {
        dispatch(checkChosenCards());
      }, 5000);
    }
  }, [chosenCards]);

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
