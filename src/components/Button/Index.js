import Link from "next/link";
import { AddProduct, AddIcon, Button, NextIcon, PreviousIcon } from "./style";
import addIcon from "../../img/add.svg";
import nextIcon from "../../img/next.svg";
import previousIcon from "../../img/previous.svg";
import useTranslation from "../../hooks/useTranslation";
import productsPageStrings from "../../translations/strings/productsPage";
import addProductPageStrings from "../../translations/strings/addProductPage";
import { useContext } from "react";
import { LocaleContext } from "../../contexts/locale";
import { ContentDirectionContext } from "../../contexts/contentDirection";

export const AddProductButton = () => {
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);
  const contentDirection = useContext(ContentDirectionContext);

  return (
    <Link href={`/${locale}/add-product`} passHref>
      <AddProduct>
        <AddIcon contentDirection={contentDirection} src={addIcon} alt="" />
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
  const contentDirection = useContext(ContentDirectionContext);
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
  const contentDirection = useContext(ContentDirectionContext);
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

// export const Button = ({ type, value, onClick }) => {
//   return (
//     <Button
//       type={type}
//       onClick={onClick}
//     >
//       {value}
//     </Button>
//   );
// }
