import { memo, useState, useCallback } from "react";
import prevIcon from "../../img/prev-image.svg";
import nextIcon from "../../img/next-image.svg";
import useTranslation from "../../hooks/useTranslation";
import translations from "../../translations/strings/productsPage";
import styled, { css } from "styled-components";

const ImageSlider = ({ images, className, styles, height }) => {
  const { t } = useTranslation();
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
        <Icon src={prevIcon} alt={t(translations, "prevSlide")} />
      </PreviousButton>

      <NextButton
        className="slider__arrowButton"
        onClick={handleNextClick}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Icon src={nextIcon} alt={t(translations, "nextSlide")} />
      </NextButton>
    </Slider>
  );
};

const Slider = styled.div`
  position: relative;
  height: ${(props) => props.height};

  &:hover,
  &:focus {
    .slider__arrowButton {
      opacity: 0.65;
    }
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  height: 100%;

  display: flex;
  overflow: hidden;
`;

const Slide = styled.li`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;

  &:first-child {
    transition: margin-left 0.3s;
    margin-left: -${(props) => props.activeIndex}00%;
  }
`;

const Image = styled.img`
  // max-width: 100%;
  // max-height: 100%;
  // margin: auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const directionButtonStyles = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 4em;
  height: 4em;
  display: flex;
  border: none;
  background-color: transparent;
  opacity: 0;
  transition: opacity 0.15s;
  padding: 0.85em 0.4em 0.85em 1.3em;

  &:hover,
  &:focus {
    opacity: 1 !important;
  }
`;

const NextButton = styled.button`
  ${directionButtonStyles}
  right: 0;
  padding: 0.85em 0.4em 0.85em 1.3em;
`;

const PreviousButton = styled.button`
  ${directionButtonStyles}
  left: 0;
  padding: 0.85em 1.3em 0.85em 0.4em;
`;

const Icon = styled.img`
  width: 100%;
  margin: auto;
`;

export default memo(ImageSlider);
