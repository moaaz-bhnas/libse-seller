import { memo, useState, useCallback, useEffect, useRef } from "react";
import prevIcon from "../../img/prev-image.svg";
import nextIcon from "../../img/next-image.svg";
import useTranslation from "../../hooks/useTranslation";
import translations from "../../translations/strings/productsPage";
import styled, { css } from "styled-components";
import Indicators from "./components/Indicators";
import { clearButtonStyles } from "../Button/style";
import zoomIn from "../../img/zoom-in.png";
import zoomOut from "../../img/zoom-out.png";
import measurements from "../../shared/measurements";

const ImageSlider = ({
  images,
  activeIndex,
  setActiveIndex,
  className,
  imageClassName,
  style,
  imageStyle,
  arrowsVisible = true,
  indicatorsVisible = true,
  fullscreen = false,
  setFullscreenVisible,
}) => {
  const sliderRef = useRef();
  const firstInteractive = useRef();
  const lastInteractive = useRef();

  const { t } = useTranslation();

  useEffect(() => {
    if (fullscreen) firstInteractive.current.focus();
  }, []);

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const trapFocus = useCallback((event, firstInteractive, lastInteractive) => {
    const { target, key, shiftKey } = event;

    if (key === "Tab" && shiftKey && target === firstInteractive) {
      event.preventDefault();
      lastInteractive.focus();
    }

    if (key === "Tab" && !shiftKey && target === lastInteractive) {
      event.preventDefault();
      firstInteractive.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      const { key } = event;
      if (key === "ArrowRight") {
        goNext();
      }
      if (key === "ArrowLeft") {
        goPrev();
      }
      if (key === "Escape") {
        setFullscreenVisible(false);
      }
      if (fullscreen) {
        trapFocus(
          event,
          firstInteractive.current,
          lastInteractive.current,
          () => setFullscreenVisible(false)
        );
      }
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    if (activeIndex === images.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    if (activeIndex === 0) {
      setActiveIndex(images.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex]);

  const handleImageButtonClick = useCallback(() => {
    if (fullscreen) {
      setFullscreenVisible(false);
    } else {
      setFullscreenVisible(true);
    }
  }, [fullscreen]);

  const calculateFullscreenImageTopOffset = useCallback((event) => {
    const imageHeight = window.innerWidth / measurements.ratio.productImage;
    const imageOffset = imageHeight - window.innerHeight;
    const ratio = imageOffset / window.innerHeight;
    const { pageY } = event;
    const topOffset = pageY * ratio;
    return topOffset;
  }, []);

  const handleMouseMove = useCallback((event) => {
    const topOffset = calculateFullscreenImageTopOffset(event);
    sliderRef.current.style.marginTop = `-${topOffset}px`;
  }, []);

  const handleMouseOver = useCallback((event) => {
    const topOffset = calculateFullscreenImageTopOffset(event);
    sliderRef.current.style.marginTop = `-${topOffset}px`;
  }, []);

  return (
    <Slider
      ref={sliderRef}
      style={style}
      className={className}
      fullscreen={fullscreen}
      onMouseMove={fullscreen ? handleMouseMove : null}
      onMouseOver={fullscreen ? handleMouseOver : null}
    >
      <List>
        {images.map((image, index) => (
          <Slide key={image} activeIndex={activeIndex} fullscreen={fullscreen}>
            <ImageButton
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={handleImageButtonClick}
              fullscreen={fullscreen}
              ref={index === activeIndex ? firstInteractive : null}
            >
              <Image
                style={imageStyle}
                className={imageClassName}
                src={image}
                alt=""
              />
            </ImageButton>
          </Slide>
        ))}
      </List>

      {arrowsVisible && (
        <>
          <PreviousButton
            fullscreen={fullscreen}
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
            fullscreen={fullscreen}
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

      {indicatorsVisible && (
        <Indicators
          fullscreen={fullscreen}
          images={images}
          activeIndex={activeIndex}
          onClick={({ event, index }) => {
            event.stopPropagation();
            event.preventDefault();
            setActiveIndex(index);
          }}
          className="imageSlider__indicators"
          ref={lastInteractive}
        />
      )}
    </Slider>
  );
};

const fullscreenStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;
`;

const Slider = styled.div`
  position: relative;
  ${({ fullscreen }) => (fullscreen ? fullscreenStyles : null)}
  /* transition: margin-top 0.05s; */

  .imageSlider__indicators {
    position: ${({ fullscreen }) => (fullscreen ? "fixed" : "absolute")};
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ fullscreen }) => (fullscreen ? "45%" : "65%")};
    transition: opacity 0.15s;
  }
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
    transition: margin-left
      ${({ fullscreen }) => (fullscreen ? "0.4s" : "0.3s")};
    margin-left: ${(props) => "-" + props.activeIndex + "00%"};
  }
`;

const ImageButton = styled.button`
  ${clearButtonStyles}
  padding: 0;
  cursor: ${({ fullscreen }) =>
      fullscreen ? `url(${zoomOut})` : `url(${zoomIn})`},
    auto;
`;

const Image = styled.img`
  max-width: 100%;
`;

const DirectionButton = styled.button`
  position: ${({ fullscreen }) => (fullscreen ? "fixed" : "absolute")};
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
