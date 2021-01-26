import { memo, useContext } from "react";
import styled from "styled-components";
import { LocaleContext } from "../../../contexts/locale";

const Details = ({ details }) => {
  const { locale } = useContext(LocaleContext);

  return (
    <StyledDetails>
      {details.map((detail, index) => (
        <Detail key={index}>
          {detail[`name_${locale}`]}:{" "}
          {detail.name_en === "Material"
            ? detail[`value_${locale}`].reduce(
                (accumulator, cuurentMaterial, index, array) => {
                  const { material, proportion } = cuurentMaterial;
                  const last = index === array.length - 1;
                  return (accumulator += `${proportion} ${material}${
                    !last ? ", " : ""
                  }`);
                },
                ""
              )
            : detail[`value_${locale}`]}
        </Detail>
      ))}
    </StyledDetails>
  );
};

const StyledDetails = styled.ul`
  padding-left: 0;
  list-style-position: inside;
`;

const Detail = styled.li`
  margin: 0.2em 0;
`;

export default memo(Details);
