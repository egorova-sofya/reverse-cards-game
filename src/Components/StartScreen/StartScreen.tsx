import React, { FC } from "react";
import { Level } from "../../../types";
import Button from "../Button/Button";
import "./StartScreen.css";
import LevelsCarousel from "../LevelsCarousel/LevelsCarousel";

interface Props {
  level: Level;
  changeLevel: (payload: Level) => void;
}

const StartScreen: FC<Props> = ({ level, changeLevel }) => {
  return (
    <div className="start-screen__wrapper">
      <h2 className="start-screen__title">Choose difficulty</h2>
      <LevelsCarousel />
      <Button className="start-screen__button">Start game</Button>
    </div>
  );
};

export default StartScreen;
