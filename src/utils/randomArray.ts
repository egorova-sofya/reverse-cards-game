import { Card } from "../../types";

export const makeCardArray = (array: Array<string>) => {
  const cardsArray = array.map((item) => ({
    img: item,
    isGuessed: false,
    isShowing: false,
    id: Math.floor(Math.random() * 10000),
  }));

  return randomArrayShuffle(cardsArray);
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
