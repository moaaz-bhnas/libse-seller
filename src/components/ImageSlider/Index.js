import { memo, useState, useCallback } from "react";
import prevIcon from "../../img/prev-image.svg";
import nextIcon from "../../img/next-image.svg";
import useTranslation from "../../hooks/useTranslation";
import translations from "../../translations/strings/productsPage";
import styled from "styled-components";
import Indicators from "./components/Indicators";

const ImageSlider = ({
  images,
  className,
  styles,
  arrowsVisible = true,
  indicatorsVisible = true,
}) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = useCallback(
    (event) => {
      const { key } = event;
      if (key === "ArrowRight") {
        goNext();
      } else if (key === "ArrowLeft") {
        goPrev();
      }
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    if (activeIndex !== images.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    if (activeIndex !== 0) {
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex]);

  return (
    <Slider
      style={styles}
      className={className}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <List>
        {images.map((image) => (
          <Slide key={image} activeIndex={activeIndex}>
            <Image src={image} alt="" />
          </Slide>
        ))}
      </List>

      {indicatorsVisible && (
        <Indicators
          images={images}
          activeIndex={activeIndex}
          onClick={({ event, index }) => {
            event.stopPropagation();
            event.preventDefault();
            setActiveIndex(index);
          }}
          className="imageSlider__indicators"
        />
      )}

      {arrowsVisible && (
        <>
          <PreviousButton
            className="slider__arrowButton"
            onClick={(event) => {
              event.preventDefault();
              goPrev();
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Icon src={prevIcon} alt={t(translations, "prevSlide")} />
          </PreviousButton>

          <NextButton
            className="slider__arrowButton"
            onClick={(event) => {
              event.preventDefault();
              goNext();
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Icon src={nextIcon} alt={t(translations, "nextSlide")} />
          </NextButton>
        </>
      )}
    </Slider>
  );
};

const Slider = styled.div`
  position: relative;

  .imageSlider__indicators {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 65%;
    transition: opacity 0.15s;
  }

  /* &:hover,
  &:focus {
    .slider__arrowButton {
      opacity: 0.65;
    }
    .imageSlider__indicators {
      opacity: 1;
    }
  } */
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
  padding-right: 0;

  display: flex;
  overflow: hidden;
`;

const Slide = styled.li`
  flex-shrink: 0;
  width: 100%;
  display: flex;

  &:first-child {
    transition: margin-left 0.3s;
    margin-left: ${(props) => "-" + props.activeIndex + "00%"};
  }
`;

const Image = styled.img`
  max-width: 100%;
`;

const DirectionButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 4em;
  height: 4em;
  display: flex;
  border: none;
  background-color: transparent;
  opacity: 0.65;
  transition: opacity 0.15s;
  padding: 0.85em 0.4em 0.85em 1.3em;

  &:hover,
  &:focus {
    opacity: 1;
  }
`;

const NextButton = styled(DirectionButton)`
  right: 0;
  padding: 0.85em 0.4em 0.85em 1.3em;
`;

const PreviousButton = styled(DirectionButton)`
  left: 0;
  padding: 0.85em 1.3em 0.85em 0.4em;
`;

const Icon = styled.img`
  width: 100%;
  margin: auto;
`;

export default memo(ImageSlider);
