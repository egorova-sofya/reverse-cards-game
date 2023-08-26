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
  decreaseNumberOfAttempts,
  duplicateCards,
  increaseNumberOfMoves,
  makeCardObjectArray,
  mixCards,
  setCardsQuantity,
  setLevel,
  setNumberOfAttempts,
} from "../../app/commonSlice";

const App = () => {
  const [showStartScreen, setShowStartScreen] = useState(true);

  const level = useSelector((state: RootState) => state.commonSlice.level);
  const levels = useSelector((state: RootState) => state.commonSlice.levels);
  const chosenCards = useSelector(
    (state: RootState) => state.commonSlice.chosenCards
  );
  const numberOfAttempts = useSelector(
    (state: RootState) => state.commonSlice.numberOfAttempts
  );
  const finalCards = useSelector(
    (state: RootState) => state.commonSlice.finalCards
  );
  const dispatch = useDispatch();

  const createCardArray = () => {
    dispatch(setCardsQuantity(level.columnQuantity));
    dispatch(makeCardObjectArray());
    dispatch(duplicateCards());
    dispatch(mixCards());
    dispatch(
      setNumberOfAttempts(
        Math.pow(level.columnQuantity, 2) + level.columnQuantity
      )
    );
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

    //delete later
    // onGameStarted();
  }, []);

  // const resetAllValues = () => {
  //   setCardList(makeCardArray(cardListArray));
  //   setAttemptsRemaining(0);
  //   setGuessedCardsQuantity(0);
  // };

  const onMoveMade = () => {
    dispatch(decreaseNumberOfAttempts());
    dispatch(increaseNumberOfMoves());
  };

  useEffect(() => {
    if (chosenCards.length == 2) {
      setTimeout(() => {
        onMoveMade();
      }, 100);
    }
  }, [chosenCards]);

  const showLoseWindow = finalCards.length > 0 && numberOfAttempts == 0;

  const showWinWindow = finalCards.length == 0;

  return (
    <>
      <main className="container">
        <h1 className="visually-hidden">Memory game</h1>
        <div className="main__wrapper">
          <div className="main__content">
            {/* {showLoseWindow ? (
              <InfoWindow cb={resetAllValues} gameResult="lose" />
            ) : showWinWindow ? (
              <InfoWindow cb={resetAllValues} gameResult="win" />
            ) : (
              <></>
            )} */}
            {showStartScreen && <StartScreen onGameStarted={onGameStarted} />}
            {!showStartScreen && <CardsList />}
            {/* <CardsList /> */}
          </div>

          <StatusBar />
        </div>
      </main>
    </>
  );
};

// export default withSplashScreen(App);
export default App;
