import React, { useEffect, useState } from "react";
import CardsList from "../CardsList/CardsList";
import "./App.css";
import cardListArray from "../../utils/cardListArray";

import { Card } from "./../../../types";
import { makeCardArray } from "../../utils/randomArray";
import InfoWindow from "../InfoWindow/InfoWindow";
import StatusBar from "../StatusBar/StatusBar";

export const App = () => {
  const [cardList, setCardList] = useState<Card[]>([]);
  const totalNumberOfAttempts = 2;
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const [chosenCards, setChosenCards] = useState<Card[]>([]);
  const [guessedCardsQuantity, setGuessedCardsQuantity] = useState(0);

  const resetAllValues = () => {
    setCardList(makeCardArray(cardListArray));
    setNumberOfAttempts(0);
    setGuessedCardsQuantity(0);
  };

  useEffect(() => {
    setCardList(makeCardArray(cardListArray));
  }, []);

  useEffect(() => {
    showCard();
    if (chosenCards.length === 2) {
      setTimeout(() => {
        hideAllCards();
        setChosenCards([]);
        setNumberOfAttempts(() => numberOfAttempts + 1);
        checkCardsPair(chosenCards);
      }, 1000);
    }
  }, [chosenCards]);

  const checkCardsPair = (chosenCards: Card[]) => {
    const firstTitle = chosenCards[0].img;
    const secondTitle = chosenCards[1].img;
    const firstId = chosenCards[0].id;
    const secondId = chosenCards[1].id;
    if (firstTitle === secondTitle && firstId !== secondId) {
      setGuessedCardsQuantity(() => guessedCardsQuantity + 2);
      setCardList(
        cardList.map((item) => {
          if (firstTitle === item.img) {
            return {
              ...item,
              isGuessed: true,
            };
          } else {
            return item;
          }
        })
      );
    }
  };

  const hideAllCards = () => {
    setCardList(
      cardList.map((item) => {
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

  const isShowingErrorWindow =
    guessedCardsQuantity < cardList.length &&
    totalNumberOfAttempts - numberOfAttempts === 0;

  const isShowingSuccessWindow = guessedCardsQuantity === cardList.length;

  return (
    <>
      {isShowingErrorWindow ? (
        <InfoWindow cb={resetAllValues}>
          Увы, вы проиграли.<br></br>У вас закончились ходы
        </InfoWindow>
      ) : isShowingSuccessWindow ? (
        <InfoWindow cb={resetAllValues}>
          Ура, вы выиграли!<br></br>Это заняло ${numberOfAttempts} ходов
        </InfoWindow>
      ) : (
        <></>
      )}

      <main className="container">
        <h1 className="main__title">Memory</h1>
        <div className="main__wrapper">
          <p className="main__text main__text--attempts">
            Сделано ходов
            <span className="main__accent-text">{numberOfAttempts}</span>
          </p>
          <div className="main__card-list">
            <CardsList
              cardList={cardList}
              chosenCards={chosenCards}
              setChosenCards={setChosenCards}
            />
          </div>
          <p className="main__text main__text--attempts-balance">
            Осталось попыток
            <span className="main__accent-text">
              {totalNumberOfAttempts - numberOfAttempts}
            </span>
          </p>

          <StatusBar />
        </div>
      </main>
    </>
  );
};
