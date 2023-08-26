import React, { FC } from "react";
import desktopLogo from "./../../images/Logo-desktop.svg";
import mobileLogo from "./../../images/Logo-mobile.svg";
import "./StatusBar.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface Props {
  showStatistics: boolean;
}

const StatusBar: FC<Props> = ({ showStatistics }) => {
  const numberOfAttempts = useSelector(
    (state: RootState) => state.commonSlice.numberOfAttempts
  );
  const numberOfMoves = useSelector(
    (state: RootState) => state.commonSlice.numberOfMoves
  );
  return (
    <div className="status-bar__wrapper">
      {showStatistics && (
        <div className="status-bar__stats status-bar__attempts">
          <p className="status-bar__score">{numberOfAttempts}</p>
          <p className="status-bar__text">Attempts remaining</p>
        </div>
      )}

      <picture className="status-bar__logo">
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

      {showStatistics && (
        <div className="status-bar__stats status-bar__moves">
          <p className="status-bar__score">{numberOfMoves}</p>
          <p className="status-bar__text">Moves made</p>
        </div>
      )}
    </div>
  );
};

export default StatusBar;
