import { memo, useState } from "react";
import styled from "styled-components";

const Preview = ({ images }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <Image
      src={images[activeImageIndex]}
      alt=""
      onMouseOver={images.length > 1 ? () => setActiveImageIndex(1) : null}
      onMouseOut={images.length > 1 ? () => setActiveImageIndex(0) : null}
    />
  );
};

const Image = styled.img`
  max-width: 100%;
`;

export default memo(Preview);
