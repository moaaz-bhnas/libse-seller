import { memo } from "react";
import styled from "styled-components";

const Images = ({ images }) => {
  console.log(images);
  return <StyledImages></StyledImages>;
};

const StyledImages = styled.ul``;

export default memo(Images);
