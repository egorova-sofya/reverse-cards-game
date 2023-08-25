import React, { useEffect, useState } from "react";
import CardsList from "../CardsList/CardsList";
import "./App.css";
import cardListArray from "../../utils/cards";
import { Card, CardsLevelInfo, Level } from "./../../../types";
import InfoWindow from "../InfoWindow/InfoWindow";
import StatusBar from "../StatusBar/StatusBar";
import StartScreen from "../StartScreen/StartScreen";
import { withSplashScreen } from "../withSplashScreen/withSplashScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  duplicateCards,
  makeCardObjectArray,
  mixCards,
  setCardsQuantity,
  setLevel,
} from "../../app/commonSlice";

const App = () => {
  const [cardList, setCardList] = useState<Card[]>([]);
  const totalNumberOfAttempts = 10;
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const [chosenCards, setChosenCards] = useState<Card[]>([]);
  const [guessedCardsQuantity, setGuessedCardsQuantity] = useState(0);
  const [showStartScreen, setShowStartScreen] = useState(true);

  const level = useSelector((state: RootState) => state.commonSlice.level);
  const levels = useSelector((state: RootState) => state.commonSlice.levels);

  const dispatch = useDispatch();

  const createCardArray = () => {
    dispatch(setCardsQuantity(level.columnQuantity));
    dispatch(makeCardObjectArray());
    dispatch(duplicateCards());
    dispatch(mixCards());
  };

  const onGameStarted = () => {
    localStorage.setItem("level", level.level);
    setShowStartScreen(false);
    createCardArray();
  };

  useEffect(() => {
    const savedLevel = localStorage.getItem("level");
    if (savedLevel) {
      const savedLevelObject = levels.find((item) => item.level == savedLevel);
      savedLevelObject && dispatch(setLevel(savedLevelObject));
    }

    onGameStarted();
  }, []);

  // const resetAllValues = () => {
  //   setCardList(makeCardArray(cardListArray));
  //   setNumberOfAttempts(0);
  //   setGuessedCardsQuantity(0);
  // };

  // useEffect(() => {
  //   showCard();
  //   if (chosenCards.length === 2) {
  //     setTimeout(() => {
  //       hideAllCards();
  //       setChosenCards([]);
  //       setNumberOfAttempts(() => numberOfAttempts + 1);
  //       checkCardsPair(chosenCards);
  //     }, 1000);
  //   }
  // }, [chosenCards]);

  // const checkCardsPair = (chosenCards: Card[]) => {
  //   const firstTitle = chosenCards[0].img;
  //   const secondTitle = chosenCards[1].img;
  //   const firstId = chosenCards[0].id;
  //   const secondId = chosenCards[1].id;
  //   if (firstTitle === secondTitle && firstId !== secondId) {
  //     setGuessedCardsQuantity(() => guessedCardsQuantity + 2);
  //     setCardList(
  //       cardList.map((item) => {
  //         if (firstTitle === item.img) {
  //           return {
  //             ...item,
  //             isGuessed: true,
  //           };
  //         } else {
  //           return item;
  //         }
  //       })
  //     );
  //   }
  // };

  // const hideAllCards = () => {
  //   setCardList(
  //     cardList.map((item) => {
  //       return {
  //         ...item,
  //         isShowing: false,
  //       };
  //     })
  //   );
  // };

  // const showCard = () => {
  //   if (chosenCards.length <= 2 && chosenCards.length > 0) {
  //     setCardList(
  //       cardList.map((item) => {
  //         if (item.id === chosenCards[chosenCards.length - 1].id) {
  //           return {
  //             ...item,
  //             isShowing: !item.isShowing,
  //           };
  //         } else {
  //           return item;
  //         }
  //       })
  //     );
  //   }
  // };

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
            {/* {isShowingErrorWindow ? (
              <InfoWindow cb={resetAllValues} gameResult="lose" />
            ) : isShowingSuccessWindow ? (
              <InfoWindow cb={resetAllValues} gameResult="win" />
            ) : (
              <></>
            )} */}
            {/* {showStartScreen && <StartScreen onGameStarted={onGameStarted} />}
            {!showStartScreen && <CardsList />} */}
            <CardsList />
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

// export default withSplashScreen(App);
export default App;
