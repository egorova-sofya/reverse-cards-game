import React, { FC, ReactNode } from "react";
import "./InfoWindow.css";

interface Props {
  children: ReactNode;
  cb: () => void;
}

const InfoWindow: FC<Props> = ({ children, cb }) => {
  return (
    <>
      <div className="info-window__wrapper">
        <p className="info_window__text">{children}</p>
        <button onClick={cb} className="info-window__button" type="button">
          Сыграть еще
        </button>
      </div>
    </>
  );
};

export default InfoWindow;
