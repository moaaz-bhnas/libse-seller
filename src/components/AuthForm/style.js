import styled, { css } from "styled-components";
import fonts from "../../shared/fonts";
import theme from "../../shared/theme";
import { rectButton } from "../Button/style";
import { title } from "../Title/style";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 25em;
`;

export const Title = styled.h2`
  ${title}
`;

const linkStyles = css`
  color: ${theme.text.interactive};
  text-decoration: none;
  align-self: flex-start;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export const PasswordRecoveryLink = styled.a`
  ${linkStyles}
  margin-bottom: 1em;
`;

export const SubmitButton = styled.button`
  ${rectButton}
  align-self: flex-start;
`;

export const P = styled.p``;

export const AuthLink = styled.a`
  ${linkStyles}
`;
