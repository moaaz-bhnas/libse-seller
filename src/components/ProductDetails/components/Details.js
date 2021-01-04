import { memo, useContext } from "react";
import styled from "styled-components";
import { LocaleContext } from "../../../contexts/locale";

const Details = ({ details }) => {
  const { locale } = useContext(LocaleContext);

  return (
    <StyledDetails>
      {details.map((detail, index) => (
        <Detail key={index}>
          {detail[`name_${locale}`]}: {detail[`value_${locale}`]}
        </Detail>
      ))}
    </StyledDetails>
  );
};

const StyledDetails = styled.ul``;

const Detail = styled.li``;

export default memo(Details);
