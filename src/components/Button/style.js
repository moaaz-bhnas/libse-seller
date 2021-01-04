import styled, { css } from "styled-components";
import theme from "../../shared/theme";
import measurements from "../../shared/measurements";

export const rectButton = css`
  text-transform: uppercase;
  font-weight: 700;
  color: #fff;
  background-color: ${theme.bg.accent};
  border-radius: ${measurements.borderRadius.input};
  border: none;
  padding: 0.8em 1em;
  cursor: pointer;
  transition-property: box-shadow, background-color;
  transition-duration: 0.15s;
  display: inline-flex;
  align-items: center;
  line-height: 1;

  &:hover {
    background-color: #ae452e;
  }

  &[data-disabled="true"] {
    opacity: 0.65;
    cursor: not-allowed;

    &:hover {
      background-color: ${theme.bg.accent};
    }
  }
`;

export const Button = styled.button`
  ${rectButton};

  &[data-positioned-absolutely="true"] {
    position: absolute;
    left: ${(props) => (props.contentDirection === "ltr" ? "25em" : "initial")};
    right: ${(props) =>
      props.contentDirection === "rtl" ? "25em" : "initial"};
    transform: ${(props) =>
      props.contentDirection === "ltr"
        ? "translateX(-100%)"
        : "translateX(100%)"};
  }
`;

export const AddProduct = styled.a`
  text-decoration: none;
  ${rectButton}
  margin-bottom: 1em;

  .addSvg {
    fill: #fff;
    width: 1em;
    margin-right: ${(props) =>
      props.contentDirection === "ltr" ? ".55em" : "0"};
    margin-left: ${(props) =>
      props.contentDirection === "ltr" ? "0" : ".55em"};
  }
`;

export const NextIcon = styled.img`
  width: 1em;
  margin-left: ${(props) => (props.contentDirection === "ltr" ? ".55em" : "0")};
  margin-right: ${(props) =>
    props.contentDirection === "ltr" ? "0" : ".55em"};
  transform: ${(props) =>
    props.contentDirection === "rtl" ? "rotate(180deg)" : "initial"};
`;

export const PreviousIcon = styled.img`
  width: 1em;
  margin-right: ${(props) =>
    props.contentDirection === "ltr" ? ".55em" : "0"};
  margin-left: ${(props) => (props.contentDirection === "ltr" ? "0" : ".55em")};
  transform: ${(props) =>
    props.contentDirection === "rtl" ? "rotate(180deg)" : "initial"};
`;

export const clearButtonStyles = css`
  border: none;
  background-color: transparent;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;
