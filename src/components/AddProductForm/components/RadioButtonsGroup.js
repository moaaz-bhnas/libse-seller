import { memo, useContext } from "react";
import styled from "styled-components";
// import { LanguageContext } from "../../../contexts/language";
import { RadioInput } from "../../Input/Index";
import formatSmallDashSeperated from "../../../utils/formatSmallDashSeperated";
import { LocaleContext } from "../../../contexts/locale";

const RadioButtonsGroup = ({
  name,
  items,
  selectedItem,
  onChange,
  itemsPerRow = 2,
  multiLanguage = true,
  required = false,
}) => {
  const { locale } = useContext(LocaleContext);

  return (
    <RadioGroup>
      {items.map((item, index) => {
        const label = multiLanguage ? item[`name_${locale}`] : item.name;
        const value = formatSmallDashSeperated(label);

        return (
          <RadioInput
            key={index}
            name={name}
            label={label}
            value={value}
            checked={label === selectedItem}
            onChange={(e) => onChange({ e, index })}
            width={100 / itemsPerRow}
            required={required}
          />
        );
      })}
    </RadioGroup>
  );
};

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;
`;

export default memo(RadioButtonsGroup);
