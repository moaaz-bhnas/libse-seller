import { memo, useContext } from "react";
import styled from "styled-components";
import { LocaleContext } from "../../contexts/locale";
import theme from "../../shared/theme";

const AvailableColors = ({
  colors,
  activeColor,
  onClick,
  styles,
  namesVisible = false,
}) => {
  const { locale } = useContext(LocaleContext);

  return (
    <Colors style={styles}>
      {colors.map((color, index, colors) => (
        <Color key={color[`name_${locale}`]}>
          <ColorButton
            aria-label={color[`name_${locale}`]}
            color={color.name_en}
            onClick={() => onClick({ index })}
            title={!namesVisible ? color[`name_${locale}`] : null}
            data-active={color.name_en === activeColor.name_en}
            onMouseDown={(e) => e.preventDefault()}
          />
          {namesVisible && <ColorName>{color[`name_${locale}`]}</ColorName>}
        </Color>
      ))}
    </Colors>
  );
};

const Colors = styled.ul`
  list-style: none;
  padding-left: 0;
  padding-right: 0;
  display: flex;
  margin-left: -0.5em;
  margin-right: -0.5em;
`;

const Color = styled.li`
  margin: 0 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ColorButton = styled.button`
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid #bbb;
  border: #e2e2e2 1px solid;
  background-color: ${(props) => props.color};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    bottom: -4px;
    right: -4px;
    border-radius: 50%;
    border: #bbb 1px solid;
  }

  &[data-active="true"] {
    &::after {
      border-color: #222;
    }
  }
`;

const ColorName = styled.p`
  margin: 0.6em 0 0;
  font-size: 0.95rem;
  color: ${theme.text.grey};
`;

export default memo(AvailableColors);
