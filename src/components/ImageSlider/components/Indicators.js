import { forwardRef, memo } from "react";
import styled from "styled-components";
import { listStyles } from "../../List/style";

const Indicators = (
  { images, activeIndex, style, className, onClick },
  lastInteractiveRef
) => {
  return (
    <StyledIndicators className={className} style={style}>
      {images.map((image, index) => (
        <Indicator key={image}>
          <Button
            data-active={index === activeIndex}
            active={index === activeIndex}
            onClick={(event) => onClick({ index, event })}
            onMouseDown={(event) => event.preventDefault()}
            ref={index === images.length - 1 ? lastInteractiveRef : null}
          />
        </Indicator>
      ))}
    </StyledIndicators>
  );
};

const StyledIndicators = styled.ul`
  ${listStyles}
  display: flex;
`;

const Indicator = styled.li`
  flex-grow: 1;
  margin: 0 0.125em;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  padding: 1.5em 0;
  width: 100%;
  position: relative;

  display: flex;
  align-items: center;
  transition: background-color 0.15s;

  &::after {
    content: "";
    height: 0.25em;
    position: absolute;
    left: 0;
    right: 0;
    background-color: ${(props) =>
      props.active
        ? "rgba(40, 40, 40, .9)!important"
        : "rgba(40, 40, 40, .35)"};
  }

  &:hover,
  &:focus {
    &::after {
      background-color: rgba(40, 40, 40, 0.6);
    }
  }
`;

export default memo(forwardRef(Indicators));
