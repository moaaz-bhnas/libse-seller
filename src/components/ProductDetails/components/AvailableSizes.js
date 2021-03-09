import { memo } from "react";
import styled from "styled-components";
import theme from "../../../shared/theme";
import { listStyles } from "../../List/style";

const AvailableSizes = ({ sizes }) => {
  return (
    <Sizes>
      {sizes.map((size) => (
        <Size key={size.key}>{size.name}</Size>
      ))}
    </Sizes>
  );
};

const Sizes = styled.ul`
  ${listStyles}

  display: flex;
  margin: 0 -0.4em;
`;

const Size = styled.li`
  text-transform: uppercase;
  margin: 0 0.4em;

  width: 2.5em;
  height: 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${theme.border.darkGrey};
  border-radius: 50%;
`;

export default memo(AvailableSizes);
