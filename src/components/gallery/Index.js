import { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Images from "./components/Images";
import Thumbnails from "./components/Thumbnails";

const Gallery = ({ activeColor }) => {
  const { images } = activeColor;
  const imagesRefs = useRef(Array(images.length).fill(null));
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(
    function scrollIntoView() {
      const imageTopPosition =
        imagesRefs.current[activeImageIndex].offsetTop - 48;
      window.scrollTo({ top: imageTopPosition, behavior: "smooth" });
    },
    [activeImageIndex]
  );

  return (
    <StyledGallery>
      <Images images={images} ref={imagesRefs} />
      <Thumbnails images={images} setActiveImageIndex={setActiveImageIndex} />
    </StyledGallery>
  );
};

const StyledGallery = styled.div``;

export default memo(Gallery);
