import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, CardsLevelInfo } from "../../types";
import initialCards from "./../utils/cards";
import levels from "./../utils/levels";

const initialState = {
  level: levels[1],
  levels: levels,
  initialCards: initialCards,
  finalCards: [] as Card[],
  chosenCards: [] as Card[],
  numberOfAttempts: 0,
  numberOfMoves: 0,
};

const randomArrayShuffle = (array: Card[]) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    resetState: (state) => ({ ...initialState, level: state.level }),

    setLevel: (state, action: PayloadAction<CardsLevelInfo>) => {
      state.level = action.payload;
    },

    setChosenCards: (state, action: PayloadAction<Card>) => {
      state.chosenCards = [...state.chosenCards, action.payload];
    },

    setCardsQuantity: (state, action: PayloadAction<number>) => {
      const newArr = [...state.initialCards];
      state.initialCards = newArr.splice(
        0,
        (action.payload * action.payload) / 2
      );
    },

    makeCardObjectArray: (state) => {
      state.finalCards = state.initialCards.map((item) => ({
        img: item,
        isGuessed: false,
        isShowing: false,
        id: Math.floor(Math.random() * 10000),
      }));
    },

    duplicateCards: (state) => {
      const newArr = [...state.finalCards];
      state.finalCards = newArr.flatMap((i) => [
        i,
        { ...i, id: Math.floor(Math.random() * 10000) },
      ]);
    },

    mixCards: (state) => {
      const newArr = [...state.finalCards];
      state.finalCards = randomArrayShuffle(newArr);
    },

    choseCard: (state, action: PayloadAction<Card>) => {
      const newArr = [...state.finalCards];

      const chosenCardQuantity = state.finalCards.filter(
        (item) => item.isShowing
      );

      if (chosenCardQuantity.length < 2) {
        state.finalCards = newArr.map((item) => {
          if (item.id === action.payload.id) {
            return { ...action.payload, isShowing: true };
          }
          return item;
        });
      }
    },

    checkChosenCards: (state) => {
      const newArr = [...state.finalCards];

      if (
        state.chosenCards.length == 2 &&
        state.chosenCards[0].img == state.chosenCards[1].img
      ) {
        state.finalCards = newArr.map((item) => {
          if (item.img == state.chosenCards[0].img) {
            return { ...item, isGuessed: true, isShowing: false };
          }
          return item;
        });
        state.chosenCards = [];
      } else if (state.chosenCards.length == 2) {
        state.finalCards = newArr.map((item) => {
          return { ...item, isShowing: false };
        });
        state.chosenCards = [];
      }
    },

    setNumberOfAttempts: (state, action: PayloadAction<number>) => {
      state.numberOfAttempts = action.payload;
    },
    decreaseNumberOfAttempts: (state) => {
      state.numberOfAttempts = --state.numberOfAttempts;
    },
    increaseNumberOfMoves: (state) => {
      state.numberOfMoves = ++state.numberOfMoves;
    },
  },
});

export const {
  resetState,
  setLevel,
  setChosenCards,
  setCardsQuantity,
  makeCardObjectArray,
  duplicateCards,
  mixCards,
  choseCard,
  checkChosenCards,
  setNumberOfAttempts,
  decreaseNumberOfAttempts,
  increaseNumberOfMoves,
} = commonSlice.actions;

export default commonSlice.reducer;
