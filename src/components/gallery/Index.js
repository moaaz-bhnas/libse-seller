import { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Images from "./components/Images";
import Thumbnails from "./components/Thumbnails";

const Gallery = ({ activeColor }) => {
  const { images } = activeColor;
  const imagesRefs = useRef(Array(images.length).fill(null));
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleThumbnailClick = useCallback((index) => {
    const imageTopPosition = imagesRefs.current[index].offsetTop - 48;
    window.scrollTo({ top: imageTopPosition, behavior: "smooth" });
  }, []);

  return (
    <StyledGallery>
      <Images images={images} ref={imagesRefs} />
      <Thumbnails
        images={images}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
        onClick={handleThumbnailClick}
        imagesRefs={imagesRefs}
      />
    </StyledGallery>
  );
};

const StyledGallery = styled.div``;

export default memo(Gallery);
