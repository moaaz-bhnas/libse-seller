import { memo, useState } from "react";
import styled from "styled-components";
import Images from "./components/Images";
import Thumbnails from "./components/Thumbnails";

const Gallery = ({ activeColor }) => {
  const { images } = activeColor;
  return (
    <StyledGallery>
      <Images images={images} />
      <Thumbnails images={images} />
    </StyledGallery>
  );
};

const StyledGallery = styled.div``;

export default memo(Gallery);
