import { memo, useState } from "react";
import styled from "styled-components";

const Preview = ({ images }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <Image
      src={images[activeImageIndex]}
      alt=""
      onMouseOver={() => setActiveImageIndex(1)}
      onMouseOut={() => setActiveImageIndex(0)}
    />
  );
};

const Image = styled.img`
  max-width: 100%;
`;

export default memo(Preview);
