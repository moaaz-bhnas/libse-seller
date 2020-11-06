import Link from "next/link";
import { AddProduct, Button, NextIcon, PreviousIcon } from "./style";
import nextIcon from "../../img/next.svg";
import previousIcon from "../../img/previous.svg";
import useTranslation from "../../hooks/useTranslation";
import productsPageStrings from "../../translations/strings/productsPage";
import addProductPageStrings from "../../translations/strings/addProductPage";
import { useContext } from "react";
import { LocaleContext } from "../../contexts/locale";
import { ContentDirectionContext } from "../../contexts/contentDirection";
import AddIcon from "../../svgs/Add";

export const AddProductButton = () => {
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);
  const { contentDirection } = useContext(ContentDirectionContext);

  return (
    <Link href={`/${locale}/add-product`} passHref>
      <AddProduct contentDirection={contentDirection}>
        <AddIcon />
        {t(productsPageStrings, "addProduct")}
      </AddProduct>
    </Link>
  );
};

export const NextButton = ({
  onClick,
  disabled = false,
  positionedAbsolutely,
}) => {
  const { contentDirection } = useContext(ContentDirectionContext);
  const { t } = useTranslation();

  return (
    <Button
      type="submit"
      onClick={onClick}
      data-disabled={disabled}
      data-positioned-absolutely={positionedAbsolutely}
      contentDirection={contentDirection}
    >
      {t(addProductPageStrings, "next")}
      <NextIcon contentDirection={contentDirection} src={nextIcon} alt="" />
    </Button>
  );
};

export const PreviousButton = ({ onClick }) => {
  const { contentDirection } = useContext(ContentDirectionContext);
  const { t } = useTranslation();

  return (
    <Button type="button" onClick={onClick}>
      <PreviousIcon
        contentDirection={contentDirection}
        src={previousIcon}
        alt=""
      />
      {t(addProductPageStrings, "prev")}
    </Button>
  );
};
