import { memo, useContext } from "react";
import styled from "styled-components";
import { CheckboxInput } from "../../Input/Index";
import formatSmallDashSeperated from "../../../utils/formatSmallDashSeperated";
import { LocaleContext } from "../../../contexts/locale";

const CheckboxesGroup = ({
  name,
  items,
  selectedItems,
  onChange,
  itemsPerRow = 2,
  multiLanguage = true,
  required = true,
  inline = false,
}) => {
  const { locale } = useContext(LocaleContext);

  return (
    <Group inline={inline}>
      {items.map((item, index) => {
        const label = multiLanguage ? item[`name_${locale}`] : item.name;
        const value = formatSmallDashSeperated(label);

        return (
          <CheckboxInput
            key={index}
            name={name}
            label={label}
            value={value}
            checked={selectedItems.includes(value)}
            onChange={(event) => onChange({ event, index })}
            width={100 / itemsPerRow}
            required={index === 0 && selectedItems.length === 0}
          />
        );
      })}
    </Group>
  );
};

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${(props) => (props.inline ? "initial" : "1em")};
  flex-grow: ${(props) => (props.inline ? 1 : "initial")};
`;

export default memo(CheckboxesGroup);
