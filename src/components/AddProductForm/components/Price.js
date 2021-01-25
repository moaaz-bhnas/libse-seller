import { memo } from "react";
import { ButtonsContainer } from "../style";
import { InputWithAffix } from "../../Input/Index";
import { PreviousButton } from "../../Button/Index";
import styled from "styled-components";
import { title3 } from "../../Title/style";
import { rectButton } from "../../Button/style";
import useTranslation from "../../../hooks/useTranslation";
import translations from "../../../translations/strings/addProductPage";

const Information = ({ price, setPrice, onSubmit, goToPreviousStep }) => {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t(translations, "price")}</Title>

      <InputWithAffix
        affixText={t(translations, "egp")}
        label="Price"
        placeholder={t(translations, "pricePlaceholder")}
        type="number"
        min="1"
        value={price}
        onChange={(event) => setPrice(Number(event.target.value))}
      />

      <ButtonsContainer>
        <PreviousButton onClick={goToPreviousStep} />
        <SubmitButton type="submit" onClick={onSubmit}>
          {t(translations, "add")}
        </SubmitButton>
      </ButtonsContainer>
    </>
  );
};

// Styles
const Title = styled.h3`
  ${title3}
`;

const SubmitButton = styled.button`
  ${rectButton}
`;

export default memo(Information);
