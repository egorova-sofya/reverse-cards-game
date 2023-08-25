import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card, CardsLevelInfo } from "../../types";
import initialCards from "./../utils/cards";
import levels from "./../utils/levels";

const initialState = {
  level: levels[0],
  levels: levels,
  initialCards: initialCards,
  finalCards: [] as Card[],
  chosenCards: [] as Card[],
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
    setLevel: (state, action: PayloadAction<CardsLevelInfo>) => {
      state.level = action.payload;
    },
    setChosenCards: (state, action: PayloadAction<Card>) => {
      state.chosenCards = [...state.chosenCards, action.payload];
    },
    //6*6/2
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
      state.finalCards = newArr.flatMap((i) => [i, i]);
    },

    mixCards: (state) => {
      const newArr = [...state.finalCards];
      state.finalCards = randomArrayShuffle(newArr);
    },
  },
});

export const {
  setLevel,
  setChosenCards,
  setCardsQuantity,
  makeCardObjectArray,
  duplicateCards,
  mixCards,
} = commonSlice.actions;

export default commonSlice.reducer;
