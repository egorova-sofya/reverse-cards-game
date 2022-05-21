import React, { useState } from "react";
import CardsList from "../CardsList/CardsList";
import "./App.css";
import cardListArray from "../../../utils/cardListArray";

import { Card } from "./../../../types";

export const App = () => {
  const [cardList, setCardList] = useState<Card[]>(cardListArray);

  const totalNumberOfAttempts = 40;
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);

  return (
    <>
      <main className="container">
        <h1 className="main__title">Memory</h1>
        <div className="main__wrapper">
          <p className="main__text">
            Сделано ходов{" "}
            <span className="main__accent-text">{numberOfAttempts}</span>
          </p>
          <CardsList
            cardList={cardList}
            setCardList={setCardList}
            setNumberOfAttempts={setNumberOfAttempts}
          />
          <p className="main__text">
            Осталось попыток{" "}
            <span className="main__accent-text">
              {totalNumberOfAttempts - numberOfAttempts}
            </span>
          </p>
        </div>
      </main>
    </>
  );
};
