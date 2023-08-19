import React from "react";
import { Carousel } from "react-responsive-carousel";
import "./LevelsCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import levels from "../../utils/levels";

const LevelsCarousel = () => {
  return (
    <div className="levels-carousel__wrapper">
      <Carousel
        emulateTouch={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        width="100%"
        renderArrowPrev={(clickHandler, hasPrev) =>
          hasPrev && (
            <button
              className="levels-carousel__button levels-carousel__prev-button"
              onClick={clickHandler}
            ></button>
          )
        }
        renderArrowNext={(clickHandler, hasNext) =>
          hasNext && (
            <button
              className="levels-carousel__button levels-carousel__next-button"
              onClick={clickHandler}
            ></button>
          )
        }
      >
        {levels.map((item) => {
          return (
            <div className="levels-carousel__content-wrapper">
              {item.level}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${item.columns}, 1fr)`,
                  gridTemplateRows: `repeat(${item.rows}, 1fr)`,
                  gap: "10px",
                }}
              >
                {Array.from(Array(item.columns * item.rows).keys()).map(
                  (card) => (
                    <div className="levels-carousel__card"></div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default LevelsCarousel;
