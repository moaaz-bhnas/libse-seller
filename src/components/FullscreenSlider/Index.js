import { memo, useState } from "react";
import styled from "styled-components";
import ImageSlider from "../ImageSlider/Index";

const FullscreenSlider = ({
  images,
  activeIndex,
  setActiveIndex,
  setFullscreenVisible,
}) => {
  const [fullscreenImageWidth, setFullscreenImageWidth] = useState(null);

  return (
    <Fullscreen>
      <FullscreenSliderWrapper
        width={
          fullscreenImageWidth > window.innerWidth
            ? "initial"
            : fullscreenImageWidth
        }
      >
        <ImageSlider
          fullscreen
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setFullscreenVisible={setFullscreenVisible}
          fullscreenImageWidth={fullscreenImageWidth}
          setFullscreenImageWidth={setFullscreenImageWidth}
        />
      </FullscreenSliderWrapper>
    </Fullscreen>
  );
};

const Fullscreen = styled.div`
  display: flex;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;

  background-color: #222;
`;

const FullscreenSliderWrapper = styled.div`
  width: ${(props) => props.width + "px"};
`;

export default memo(FullscreenSlider);
