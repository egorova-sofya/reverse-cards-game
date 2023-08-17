import React, { FC } from "react";
import desktopLogo from "./../../images/Logo-desktop.svg";
import mobileLogo from "./../../images/Logo-mobile.svg";
import "./StatusBar.css";

interface Props {
  attempts: number;
  moves: number;
}

const StatusBar: FC<Props> = ({ attempts, moves }) => {
  return (
    <div className="status-bar__wrapper">
      <div className="status-bar__stats status-bar__attempts">
        <p className="status-bar__score">{attempts}</p>
        <p className="status-bar__text">Attempts remaining</p>
      </div>

      <picture className="status-bar__logo-style">
        <source
          width="17"
          height="15"
          media="(max-width: 576px)"
          srcSet={mobileLogo}
        />
        <source
          width="436"
          height="57"
          media="(min-width: 992px)"
          srcSet={desktopLogo}
        />

        <source
          width="175"
          height="58"
          media="(max-width: 992px)"
          srcSet={mobileLogo}
        />

        <img src={desktopLogo} alt="Game logo" />
      </picture>

      <div className="status-bar__stats status-bar__moves">
        <p className="status-bar__score">{moves}</p>
        <p className="status-bar__text">Moves made</p>
      </div>
    </div>
  );
};

export default StatusBar;
