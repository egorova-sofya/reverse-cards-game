import React, { useEffect, useState } from "react";
import CardsList from "../CardsList/CardsList";
import "./App.css";
import cardListArray from "../../utils/cardListArray";

import { Card } from "./../../../types";
import { randomArrayShuffle } from "../../utils/randomArray";
import InfoWindow from "../InfoWindow/InfoWindow";

export const App = () => {
  const [cardList, setCardList] = useState<Card[] | []>([]);
  const totalNumberOfAttempts = 40;
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const [chosenCards, setChosenCards] = useState<Card[] | []>([]);
  const [guessedCardsQuantity, setGuessedCardsQuantity] = useState(0);

  const resetAllValues = () => {
    window.location.reload();
  };

  useEffect(() => {
    setCardList(randomArrayShuffle(cardListArray));
  }, []);

  useEffect(() => {
    showCard();
    if (chosenCards.length === 2) {
      setTimeout(() => {
        hideAllCards();
        setChosenCards([]);
        setNumberOfAttempts(() => numberOfAttempts + 1);
        checkCardsPair(chosenCards);
      }, 1500);
    }
  }, [chosenCards]);

  const checkCardsPair = (chosenCards: Card[]) => {
    const firstTitle = chosenCards[0].title;
    const secondTitle = chosenCards[1].title;
    const firstId = chosenCards[0].id;
    const secondId = chosenCards[1].id;
    if (firstTitle === secondTitle && firstId !== secondId) {
      setGuessedCardsQuantity(() => guessedCardsQuantity + 2);
      setCardList(
        cardList.map((item) => {
          if (firstTitle === item.title) {
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
        <InfoWindow
          text={`Увы, вы проиграли.<br>У вас закончились ходы`}
          cb={resetAllValues}
        />
      ) : isShowingSuccessWindow ? (
        <InfoWindow
          text={`Ура, вы выиграли!<br>Это заняло ${numberOfAttempts} ходов`}
          cb={resetAllValues}
        />
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
        </div>
      </main>
    </>
  );
};
