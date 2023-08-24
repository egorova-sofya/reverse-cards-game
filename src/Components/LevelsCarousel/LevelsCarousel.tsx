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
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              className="levels-carousel__button levels-carousel__prev-button"
              onClick={onClickHandler}
              title={label}
            ></button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              className="levels-carousel__button levels-carousel__next-button"
              onClick={onClickHandler}
              title={label}
            ></button>
          )
        }
      >
        {levels.map((item) => {
          return (
            <div className="levels-carousel__content-wrapper" key={item.level}>
              <div
                className="levels-carousel__card-wrapper"
                style={{
                  gridTemplateColumns: `repeat(${item.columns}, 40px)`,
                  gridTemplateRows: `repeat(${item.rows}, 40px)`,
                }}
              >
                {Array.from(Array(item.columns * item.rows).keys()).map(() => (
                  <div className="levels-carousel__card"></div>
                ))}
              </div>
              <p className="levels-carousel__level-title">{item.level}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default LevelsCarousel;
