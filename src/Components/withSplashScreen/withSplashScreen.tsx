import React, { useState, useEffect } from "react";
import desktopLogo from "./../../images/Logo-desktop.svg";
import mobileLogo from "./../../images/Logo-mobile.svg";
import BarkingAtStars from "./../../fonts/Barking_at_Stars.otf";
import Montserrat from "./../../fonts/Montserrat-VariableFont_wght.ttf";
import "./withSplashScreen.css";

export function withSplashScreen(WrappedComponent: React.ComponentType) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentWithSplashScreen = () => {
    const [desktopLogoLoaded, setDesktopLogoLoaded] = useState(false);
    const [mobileLogoLoaded, setMobileLogoLoaded] = useState(false);
    const [barkingAtStarsLoaded, setBarkingAtStarsLoaded] = useState(false);
    const [montserratLoaded, setMontserratLoaded] = useState(false);
    const [timePassed, setTimePassed] = useState(false);

    useEffect(() => {
      const checkResources = () => {
        const desktopLogoImg = new Image();
        desktopLogoImg.src = desktopLogo;
        desktopLogoImg.onload = () => setDesktopLogoLoaded(true);

        const mobileLogoImg = new Image();
        mobileLogoImg.src = mobileLogo;
        mobileLogoImg.onload = () => setMobileLogoLoaded(true);

        const barkingAtStarsFont = new FontFace(
          "Barking_at_Stars",
          `url(${BarkingAtStars})`
        );
        barkingAtStarsFont.load().then(() => setBarkingAtStarsLoaded(true));

        const montserratFont = new FontFace("Montserrat", `url(${Montserrat})`);
        montserratFont.load().then(() => setMontserratLoaded(true));

        const timer = setTimeout(() => {
          setTimePassed(true);
        }, 3000);
        return () => clearTimeout(timer);
      };

      checkResources();
    }, []);

    const dataLoaded =
      (desktopLogoLoaded || mobileLogoLoaded) &&
      barkingAtStarsLoaded &&
      montserratLoaded &&
      timePassed;
    return (
      <div>
        {!dataLoaded && (
          <div className="splash-screen__wrapper">
            <h1 className="visually-hidden">Loading...</h1>
          </div>
        )}
        {dataLoaded && <WrappedComponent />}
      </div>
    );
  };

  ComponentWithSplashScreen.displayName = `withSplashScreen(${displayName})`;

  return ComponentWithSplashScreen;
}
