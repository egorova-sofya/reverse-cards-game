import React from "react";
import { Carousel } from "react-responsive-carousel";
import "./LevelsCarousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import levels from "../../utils/levels";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setLevel } from "../../app/commonSlice";

const LevelsCarousel = () => {
  const level = useSelector((state: RootState) => state.commonSlice.level);
  const dispatch = useDispatch();

  const selectedLevelIndex = levels
    .map((item) => item.level)
    .indexOf(level.level);

  const handleCarouselChange = (index: number) => {
    dispatch(setLevel(levels[index]));
  };

  return (
    <div className="levels-carousel__wrapper">
      <Carousel
        onChange={handleCarouselChange}
        selectedItem={selectedLevelIndex}
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
          const columnQuantity = item.columnQuantity;
          return (
            <div className="levels-carousel__content-wrapper" key={item.level}>
              <div
                className="levels-carousel__card-wrapper"
                style={{
                  gridTemplateColumns: `repeat(${columnQuantity}, 40px)`,
                  gridTemplateRows: `repeat(${columnQuantity}, 40px)`,
                }}
              >
                {Array.from(Array(columnQuantity * columnQuantity).keys()).map(
                  (item) => (
                    <div className="levels-carousel__card" key={item}></div>
                  )
                )}
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
