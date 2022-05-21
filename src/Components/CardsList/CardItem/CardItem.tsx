import React, { FC } from "react";
import { Card } from "../../../../types";
import "./CardItem.css";

interface Props {
  cardItem: Card;
}

const CardItem: FC<Props> = ({ cardItem }) => {
  return (
    <>
      <div
        className={`card-item__wrapper ${
          cardItem.isShowing ? "card-item__wrapper--active" : ""
        }`}
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
