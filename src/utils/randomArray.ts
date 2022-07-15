import { Card } from "../../types";

type StartedArray = { title: string; img: string };

const arr = [
  {
    title: "Firebase",
    img: "Firebase",
  },
  {
    title: "React",
    img: "React",
  },
  {
    title: "Nginx",
    img: "Nginx",
  },
];

export const makeCardArray = (array: StartedArray[]) => {
  const res = array.concat(array);

  const cardsArray = res.map((item) => ({
    ...item,
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
