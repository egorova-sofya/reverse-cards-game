import React, { FC, useEffect } from "react";
import { Card } from "../../../types";
import CardItem from "./CardItem/CardItem";
import { randomArrayShuffle } from "./../../../utils/randomArray";
import "./CardsList.css";

interface Props {
  cardList: Card[];
  setCardList: (payload: Card[]) => void;
  setNumberOfAttempts: (payload: number) => void;
}

const CardsList: FC<Props> = ({ cardList, setCardList }) => {
  useEffect(() => {
    randomArrayShuffle(cardList);
  });

  console.log(randomArrayShuffle(cardList));

  return (
    <>
      <div className="card-list__wrapper">
        {cardList.map((item) => (
          <CardItem key={item.id} cardItem={item} />
        ))}
      </div>
    </>
  );
};

export default CardsList;
