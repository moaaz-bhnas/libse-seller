import {
  memo,
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
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
import { ContentDirectionContext } from "../../contexts/contentDirection";

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
  setFullscreenImageWidth,
}) => {
  const sliderRef = useRef();
  const firstInteractive = useRef();
  const lastInteractive = useRef();

  const fullscreenImageWidth = useRef(0);

  const { contentDirection } = useContext(ContentDirectionContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (fullscreen) firstInteractive.current.focus();
  }, []);

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, contentDirection]);

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
        contentDirection === "ltr" ? goNext() : goPrev();
      }
      if (key === "ArrowLeft") {
        contentDirection === "ltr" ? goPrev() : goNext();
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
    [activeIndex, contentDirection]
  );

  const goNext = useCallback(() => {
    console.log("goNext");
    if (activeIndex === images.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    console.log("goPrev");
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

  const calculateFullscreenImageTopOffset = useCallback(
    (event) => {
      const imageHeight =
        fullscreenImageWidth.current / measurements.ratio.productImage;
      const imageOffset = imageHeight - window.innerHeight;
      const ratio = imageOffset / window.innerHeight;
      const { pageY } = event;
      const topOffset = pageY * ratio;
      return topOffset;
    },
    [fullscreenImageWidth.current]
  );

  const handleMouseMove = useCallback(
    (event) => {
      const topOffset = calculateFullscreenImageTopOffset(event);
      sliderRef.current.style.marginTop = `-${topOffset}px`;
    },
    [fullscreenImageWidth.current]
  );

  const handleMouseOver = useCallback(
    (event) => {
      const topOffset = calculateFullscreenImageTopOffset(event);
      sliderRef.current.style.marginTop = `-${topOffset}px`;
    },
    [fullscreenImageWidth.current]
  );

  const handleImageLoad = useCallback(
    ({ target: { clientWidth: imageWidth } }) => {
      fullscreenImageWidth.current = imageWidth;
      setFullscreenImageWidth(imageWidth);
    },
    []
  );

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
          <Slide
            key={image}
            activeIndex={activeIndex}
            contentDirection={contentDirection}
            fullscreen={fullscreen}
          >
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
                onLoad={fullscreen ? handleImageLoad : null}
              />
            </ImageButton>
          </Slide>
        ))}
      </List>

      {arrowsVisible && (
        <>
          <PreviousButton
            fullscreen={fullscreen}
            contentDirection={contentDirection}
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
            contentDirection={contentDirection}
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

// const fullscreenStyles = css`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   z-index: 4;
// `;

const Slider = styled.div`
  position: relative;
  /* ${({ fullscreen }) => (fullscreen ? fullscreenStyles : null)} */
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
  justify-content: flex-start;
  overflow: hidden;
`;

const Slide = styled.li`
  flex-shrink: 0;
  width: 100%;
  display: flex;

  &:first-child {
    transition-property: margin-left, margin-right;
    transition-duration: ${({ fullscreen }) => (fullscreen ? "0.4s" : "0.3s")};
    margin-left: ${({ activeIndex, contentDirection }) =>
      contentDirection === "ltr" ? "-" + activeIndex + "00%" : null};
    margin-right: ${({ activeIndex, contentDirection }) =>
      contentDirection === "rtl" ? "-" + activeIndex + "00%" : null};
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
  /* transform: translateY(-50%); */
  width: 4em;
  height: 4em;
  display: flex;
  border: none;
  background-color: transparent;
  opacity: 0.65;
  transition: opacity 0.15s;
  padding-top: 0.85em;
  padding-bottom: 0.85em;
  transform: ${({ contentDirection }) =>
    contentDirection === "rtl"
      ? "rotate(180deg) translateY(50%)"
      : "translateY(-50%)"};

  &:hover,
  &:focus {
    opacity: 1;
  }
`;

const NextButton = styled(DirectionButton)`
  right: ${({ contentDirection }) => (contentDirection === "ltr" ? 0 : null)};
  left: ${({ contentDirection }) => (contentDirection === "rtl" ? 0 : null)};
  padding-right: ${({ contentDirection }) =>
    contentDirection === "ltr" ? ".4em" : "1.3em"};
  padding-left: ${({ contentDirection }) =>
    contentDirection === "ltr" ? "1.3em" : ".4em"};
`;

const PreviousButton = styled(DirectionButton)`
  left: ${({ contentDirection }) => (contentDirection === "ltr" ? 0 : null)};
  right: ${({ contentDirection }) => (contentDirection === "rtl" ? 0 : null)};
  padding-right: ${({ contentDirection }) =>
    contentDirection === "ltr" ? "1.3em" : ".4em"};
  padding-left: ${({ contentDirection }) =>
    contentDirection === "ltr" ? ".4em" : "1.3em"};
`;

const Icon = styled.img`
  width: 100%;
  margin: auto;
`;

export default memo(ImageSlider);
