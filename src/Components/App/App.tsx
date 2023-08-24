import React, { useEffect, useState } from "react";
import CardsList from "../CardsList/CardsList";
import "./App.css";
import cardListArray from "../../utils/cards";

import { Card, Level } from "./../../../types";
import { makeCardArray } from "../../utils/randomArray";
import InfoWindow from "../InfoWindow/InfoWindow";
import StatusBar from "../StatusBar/StatusBar";
import StartScreen from "../StartScreen/StartScreen";

export const App = () => {
  const [level, setLevel] = useState<Level>("easy");
  const [cardList, setCardList] = useState<Card[]>([]);
  const totalNumberOfAttempts = 10;
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
      <main className="container">
        <h1 className="visually-hidden">Memory game</h1>
        <div className="main__wrapper">
          <div className="main__content">
            {isShowingErrorWindow ? (
              <InfoWindow cb={resetAllValues} gameResult="lose" />
            ) : isShowingSuccessWindow ? (
              <InfoWindow cb={resetAllValues} gameResult="win" />
            ) : (
              <></>
            )}
            <CardsList
              cardList={cardList}
              chosenCards={chosenCards}
              setChosenCards={setChosenCards}
            />

            {/* <StartScreen level={level} changeLevel={setLevel} /> */}
          </div>

          <StatusBar
            moves={numberOfAttempts}
            attempts={totalNumberOfAttempts - numberOfAttempts}
          />
        </div>
      </main>
    </>
  );
};
