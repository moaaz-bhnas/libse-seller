import { forwardRef, memo, useEffect } from "react";
import styled from "styled-components";
import { listStyles } from "../../List/style";

const Images = ({ images }, imagesRefs) => {
  return (
    <StyledImages>
      {images.map((image, index) => (
        <Item key={index}>
          <Img
            ref={(el) => (imagesRefs.current[index] = el)}
            src={image}
            alt=""
          />
        </Item>
      ))}
    </StyledImages>
  );
};

const StyledImages = styled.ul`
  ${listStyles}
`;

const Item = styled.li``;

const Img = styled.img`
  max-width: 100%;
  vertical-align: top;
`;

export default memo(forwardRef(Images));
