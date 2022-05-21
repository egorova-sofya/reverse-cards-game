import React, { useEffect, useState } from "react";
import CardsList from "../CardsList/CardsList";
import "./App.css";
import cardListArray from "../../../utils/cardListArray";

import { Card } from "./../../../types";
import { randomArrayShuffle } from "../../../utils/randomArray";

export const App = () => {
  const [cardList, setCardList] = useState<Card[] | []>([]);
  const totalNumberOfAttempts = 40;
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const [chosenCards, setChosenCards] = useState<Card[] | []>([]);

  useEffect(() => {
    setCardList(randomArrayShuffle(cardListArray));
  }, []);

  useEffect(() => {
    showCard();
    if (chosenCards.length >= 2) {
      setTimeout(() => {
        const filteredArray = checkCardsPair(
          chosenCards[0].title,
          chosenCards[1].title
        );
        hideAllCards(filteredArray);
        setChosenCards([]);
      }, 2000);
    }
  }, [chosenCards]);

  const checkCardsPair = (firstTitle: string, secondTitle: string) => {
    if (firstTitle === secondTitle) {
      return cardList.filter(
        (item) => item.title !== firstTitle || item.title !== secondTitle
      );
    } else {
      return cardList;
    }
  };

  const hideAllCards = (filteredArray: Card[]) => {
    setCardList(
      filteredArray.map((item) => {
        return {
          ...item,
          isShowing: false,
        };
      })
    );
  };

  const showCard = () => {
    if (chosenCards.length <= 2 && chosenCards.length > 0) {
      setCardList(
        cardList.map((item) => {
          if (item.id === chosenCards[chosenCards.length - 1].id) {
            return {
              ...item,
              isShowing: !item.isShowing,
            };
          } else {
            return item;
          }
        })
      );
    }
  };

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
            chosenCards={chosenCards}
            setChosenCards={setChosenCards}
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
