import { memo, useState, useCallback } from "react";
import {
  Slider,
  List,
  Slide,
  Image,
  PreviousButton,
  NextButton,
  Icon,
} from "./style";
import prevIcon from "../../img/prev-image.svg";
import nextIcon from "../../img/next-image.svg";

const ImageSlider = ({ images, className, height }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = useCallback(
    (event) => {
      event.preventDefault();

      if (activeIndex === 0) {
        setActiveIndex(images.length - 1);
      } else {
        setActiveIndex(activeIndex - 1);
      }
    },
    [activeIndex]
  );

  const handleNextClick = useCallback(
    (event) => {
      event.preventDefault();

      const lastSlide = activeIndex === images.length - 1;
      if (lastSlide) {
        setActiveIndex(0);
      } else {
        setActiveIndex(activeIndex + 1);
      }
    },
    [activeIndex]
  );

  const [arrowsVisible, setArrowsVisible] = useState(false);

  return (
    <Slider height={height} className={className}>
      <List>
        {images.map((image) => (
          <Slide key={image} activeIndex={activeIndex}>
            <Image src={image} alt="" />
          </Slide>
        ))}
      </List>

      <PreviousButton
        className="slider__arrowButton"
        onClick={handlePrevClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Icon src={prevIcon} alt="Go to previous slide" />
      </PreviousButton>

      <NextButton
        className="slider__arrowButton"
        onClick={handleNextClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Icon src={nextIcon} alt="Go to previous slide" />
      </NextButton>
    </Slider>
  );
};

export default memo(ImageSlider);
