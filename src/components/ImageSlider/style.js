import styled, { css } from "styled-components";

export const Slider = styled.div`
  position: relative;
  height: ${(props) => props.height};

  &:hover,
  &:focus {
    .slider__arrowButton {
      opacity: 0.65;
    }
  }
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: 0;
  padding-right: 0;
  width: 100%;
  height: 100%;

  display: flex;
  overflow: hidden;
`;

export const Slide = styled.li`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;

  &:first-child {
    transition: margin-left 0.3s;
    margin-left: -${(props) => props.activeIndex}00%;
  }
`;

export const Image = styled.img`
  // max-width: 100%;
  // max-height: 100%;
  // margin: auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const directionButtonStyles = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 4em;
  height: 4em;
  display: flex;
  border: none;
  background-color: transparent;
  opacity: 0;
  transition: opacity 0.15s;
  padding: 0.85em 0.4em 0.85em 1.3em;

  &:hover,
  &:focus {
    opacity: 1 !important;
  }
`;

export const NextButton = styled.button`
  ${directionButtonStyles}
  right: 0;
  padding: 0.85em 0.4em 0.85em 1.3em;
`;

export const PreviousButton = styled.button`
  ${directionButtonStyles}
  left: 0;
  padding: 0.85em 1.3em 0.85em 0.4em;
`;

export const Icon = styled.img`
  width: 100%;
  margin: auto;
`;
