import React, { FC } from "react";
import "./InfoWindow.css";

interface Props {
  text: string;
  cb: () => void;
}

const InfoWindow: FC<Props> = ({ text, cb }) => {
  return (
    <>
      <div className="info-window__wrapper">
        <p
          className="info_window__text"
          dangerouslySetInnerHTML={{ __html: text }}
        ></p>
        <button onClick={cb} className="info-window__button" type="button">
          Сыграть еще
        </button>
      </div>
    </>
  );
};

export default InfoWindow;
