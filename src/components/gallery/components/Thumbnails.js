import { memo, useCallback, useContext, useEffect } from "react";
import styled from "styled-components";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import { LayoutContext } from "../../../contexts/layout";
import measurements from "../../../shared/measurements";
import time from "../../../shared/time";
import { clearButtonStyles } from "../../Button/style";
import { listStyles } from "../../List/style";

const Thumbnails = ({
  images,
  activeImageIndex,
  setActiveImageIndex,
  imagesRefs,
  onClick,
}) => {
  const { sidebarExpanded } = useContext(LayoutContext);
  const { contentDirection } = useContext(ContentDirectionContext);

  if (typeof window !== "undefined") {
    var prevScrollY = window.scrollY;
  }
  const detectScrollDirection = useCallback(() => {
    const { scrollY } = window;
    if (scrollY > prevScrollY) {
      prevScrollY = scrollY;
      return "down";
    } else {
      prevScrollY = scrollY;
      return "up";
    }
  }, []);

  const setActiveThumbnail = useCallback(() => {
    const scrollDirection = detectScrollDirection();
    const index = getThumbnailIndexInView(scrollDirection);
    setActiveImageIndex(index);
    imagesRefs.current[index].focus();
  }, []);

  const getThumbnailIndexInView = useCallback((scrollDirection) => {
    const middlePoints = imagesRefs.current.map((ref, index) => {
      const topPosition = ref.offsetTop;
      const middlePosition = ref.height / 2 + topPosition;
      return { index, position: middlePosition };
    });

    let index;
    const windowBottomPosition = window.innerHeight + window.scrollY;
    if (scrollDirection === "down") {
      const pointInView = middlePoints
        .reverse()
        .find((point) => windowBottomPosition > point.position);
      index = pointInView ? pointInView.index : 0;
    } else {
      const pointInView = middlePoints.find(
        (point) => window.scrollY < point.position
      );
      index = pointInView ? pointInView.index : images.length - 1;
    }

    return index;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", setActiveThumbnail);
    return () => {
      window.removeEventListener("scroll", setActiveThumbnail);
    };
  }, []);

  return (
    <StyledThumbnails
      sidebarExpanded={sidebarExpanded}
      contentDirection={contentDirection}
    >
      {images.map((image, index) => (
        <Item key={index}>
          <Button
            onClick={() => onClick(index)}
            type="button"
            active={index === activeImageIndex}
          >
            <Img src={image} alt="" />
          </Button>
        </Item>
      ))}
    </StyledThumbnails>
  );
};

const StyledThumbnails = styled.ul`
  ${listStyles}

  position: fixed;
  top: 10em;
  left: ${(props) =>
    props.contentDirection === "ltr"
      ? `calc(.5em + ${
          props.sidebarExpanded
            ? measurements.width.sidebar
            : measurements.width.sidebarCollapsed
        })`
      : "initial"};
  right: ${(props) =>
    props.contentDirection === "rtl"
      ? `calc(.5em + ${
          props.sidebarExpanded
            ? measurements.width.sidebar
            : measurements.width.sidebarCollapsed
        })`
      : "initial"};
  transition-property: left, right;
  transition-duration: ${time.transition.sidebar}s;
`;

const Item = styled.li`
  margin-bottom: 0.25em;
`;

const Button = styled.button`
  ${clearButtonStyles}
  outline: ${(props) =>
    props.active ? "rgb(16, 16, 16) auto 1px;" : "initial"};
`;

const Img = styled.img`
  width: 3em;
  vertical-align: top;
`;

export default memo(Thumbnails);
