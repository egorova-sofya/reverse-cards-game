import React, { FC } from "react";
import "./InfoWindow.css";
import Button from "../Button/Button";

interface Props {
  gameResult: "win" | "lose";
  cb: () => void;
}

const InfoWindow: FC<Props> = ({ gameResult, cb }) => {
  return (
    <>
      <div
        className={`info-window__wrapper ${
          gameResult == "win" ? "info-window__win" : "info-window__lose"
        }`}
      >
        {gameResult == "win" ? (
          <p className="info_window__text">
            Congratulations, you totally crushed it!
          </p>
        ) : (
          <p className="info_window__text">
            Oh no, tough luck! But don't worry! Even the best ones stumble
            sometimes
          </p>
        )}

        <Button onClick={cb} className="info-window__button">
          New game
        </Button>
      </div>
    </>
  );
};

export default InfoWindow;
