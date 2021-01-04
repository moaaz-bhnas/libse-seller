import { memo } from "react";
import styled from "styled-components";
import { listStyles } from "../../List/style";
import Image from "next/image";

const Images = ({ images }) => {
  console.log(images);
  return (
    <StyledImages>
      {images.map((image, index) => (
        <Item key={index}>
          <Image src={image} alt="" layout="fill" unsized />
        </Item>
      ))}
    </StyledImages>
  );
};

const StyledImages = styled.ul`
  ${listStyles}
`;

const Item = styled.li``;

export default memo(Images);
