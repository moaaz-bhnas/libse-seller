import { memo, useContext } from "react";
import styled from "styled-components";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import { LayoutContext } from "../../../contexts/layout";
import measurements from "../../../shared/measurements";
import time from "../../../shared/time";
import { clearButtonStyles } from "../../Button/style";
import { listStyles } from "../../List/style";

const Thumbnails = ({ images, setActiveImageIndex }) => {
  const { sidebarExpanded } = useContext(LayoutContext);
  const { contentDirection } = useContext(ContentDirectionContext);

  return (
    <StyledThumbnails
      sidebarExpanded={sidebarExpanded}
      contentDirection={contentDirection}
    >
      {images.map((image, index) => (
        <Item key={index}>
          <Button onClick={() => setActiveImageIndex(index)} type="button">
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
`;

const Img = styled.img`
  width: 3em;
  vertical-align: top;
`;

export default memo(Thumbnails);
