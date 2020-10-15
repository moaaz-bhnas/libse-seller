import {
  inputStyles,
  InputContainer,
  StyledInputWithPrepending,
  Prepending,
} from "./style";
import styled, { css } from "styled-components";
import { useContext } from "react";
import { ContentDirectionContext } from "../../contexts/contentDirection";
import { LocaleContext } from "../../contexts/locale";

export const InputWithPrepending = ({
  prependingText,
  label,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <InputContainer>
      <Prepending>{prependingText}</Prepending>
      <StyledInputWithPrepending
        type="number"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </InputContainer>
  );
};

export const RadioInput = ({
  name,
  label,
  value,
  checked,
  onChange,
  width,
  required,
}) => {
  const contentDirection = useContext(ContentDirectionContext);

  return (
    <Label width={width} contentDirection={contentDirection}>
      <StyledRadioInput
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
        contentDirection={contentDirection}
      />
      {label}
    </Label>
  );
};

export const CheckboxInput = ({
  name,
  label,
  value,
  checked,
  onChange,
  width,
  required,
}) => {
  const contentDirection = useContext(ContentDirectionContext);

  return (
    <Label width={width} contentDirection={contentDirection}>
      <StyledCheckboxInput
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
        contentDirection={contentDirection}
      />
      {label}
    </Label>
  );
};

export const MultiLanguageSelect = ({ options, value, onChange }) => {
  const { locale } = useContext(LocaleContext);

  return (
    <Select
      value={value}
      onChange={(event) => onChange(event.target.selectedIndex)}
    >
      {options.map((option, index) => (
        <Option key={index} value={option[`name_${locale}`]}>
          {option[`name_${locale}`]}
        </Option>
      ))}
    </Select>
  );
};

const Label = styled.label`
  width: ${(props) => props.width}%;
  padding: 0.2em 0;

  &:not(:last-child) {
    padding-right: ${(props) =>
      props.contentDirection === "ltr" ? ".75em" : "initial"};
    padding-left: ${(props) =>
      props.contentDirection === "ltr" ? "initial" : ".75em"};
  }
`;

const checkInputStyles = css`
  margin-top: 0;
  margin-bottom: 0;
  margin-right: ${(props) =>
    props.contentDirection === "ltr" ? ".75em" : "initial"};
  margin-left: ${(props) =>
    props.contentDirection === "ltr" ? "initial" : ".75em"};
`;

const StyledRadioInput = styled.input`
  ${checkInputStyles}
`;

const StyledCheckboxInput = styled.input`
  ${checkInputStyles}
`;

const Select = styled.select`
  ${inputStyles}
  width: 100%;
  margin-bottom: 0.8em;
`;

const Option = styled.option`
  text-transform: capitalize;
`;
