import { memo, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import useTranslation from "../../../hooks/useTranslation";
import measurements from "../../../shared/measurements";
import theme from "../../../shared/theme";
import { rectButton } from "../../Button/style";
import ImageCropperModal from "./ImageCropperModal";
import translations from "../../../translations/strings/addProductPage";
import removeIcon from "../../../img/minus.svg";
import Add from "../../../svgs/Add";
import { inputStyles } from "../../Input/style";
import sortByOrder from "../../../utils/sortByOrder";

const ImageUploader = ({
  gallery,
  addImage,
  removeImage,
  colorIndex,
  onOrderChange,
}) => {
  const imageInputRef = useRef(null);
  const orderInputs = useRef([]);
  const { t } = useTranslation();
  const [src, setSrc] = useState(null);

  const handleSelectImage = useCallback((event) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.addEventListener("load", () => setSrc(reader.result));
    reader.readAsDataURL(file);
  }, []);

  const sortedGallery = sortByOrder(gallery);

  return (
    <Container>
      <AddInput
        id={`imageInput${colorIndex}`}
        type="file"
        accept="image/*"
        multiple={false}
        onChange={handleSelectImage}
        onClick={(event) => (event.target.value = null)}
        ref={imageInputRef}
      />
      <TextLabel
        htmlFor={`imageInput${colorIndex}`}
        className="imageInput__label"
      >
        {t(translations, "chooseImage")}
      </TextLabel>

      {src && (
        <ImageCropperModal
          src={src}
          setSrc={setSrc}
          imageInputRef={imageInputRef}
          addImage={addImage}
        />
      )}

      <Gallery>
        {sortedGallery.map((item, imageIndex) => (
          <Item key={imageIndex}>
            <Image src={item.url} alt={t(translations, "productImage")} />
            <RemoveButton type="button" onClick={() => removeImage(imageIndex)}>
              <Icon src={removeIcon} alt={t(translations, "removeImage")} />
            </RemoveButton>
            <OrderInput
              aria-label="image order"
              type="number"
              min={1}
              max={sortedGallery.length}
              value={item.order}
              onChange={({ target: { value } }) => {
                orderInputs.current[value - 1].focus();
                onOrderChange(colorIndex, imageIndex, Number(value));
              }}
              ref={(el) => {
                orderInputs.current[imageIndex] = el;
              }}
            />
          </Item>
        ))}
        {gallery.length > 0 && (
          <Item>
            <IconLabel htmlFor={`imageInput${colorIndex}`}>
              <Add title={t(translations, "addImage")} />
            </IconLabel>
          </Item>
        )}
      </Gallery>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  margin-bottom: 1.25em;
  border: 1px solid ${theme.border.grey};
  border-radius: ${measurements.borderRadius.input};
  padding: 1em;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextLabel = styled.label`
  ${rectButton}
  font-weight: normal;
  text-transform: initial;
  margin-bottom: 1em;
`;

const IconLabel = styled.label`
  margin: auto;
  cursor: pointer;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  border: 2px solid ${theme.text.interactive};
  padding: 0.15em;

  .addSvg {
    fill: ${theme.bg.accent};
    width: 100%;
  }
`;

const AddInput = styled.input`
  position: absolute;
  left: -200rem;

  &:focus {
    & + .imageInput__label {
      outline: -webkit-focus-ring-color auto 1px;
    }
  }
`;

const Gallery = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-wrap: wrap;

  width: 100%;
`;

const Item = styled.li`
  flex: 0 0 25%;

  display: flex;

  position: relative;

  &:last-child {
    min-height: 4em;
  }
`;

const Image = styled.img`
  max-width: 100%;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.375em;
  right: 0.375em;

  background-color: rgba(0, 0, 0, 0.5);
  border: none;

  width: 1.75em;
  height: 1.75em;
  border-radius: 50%;
  display: flex;
`;

const Icon = styled.img`
  width: 100%;
  margin: auto;
`;

const OrderInput = styled.input`
  ${inputStyles}
  width: 2em;
  height: 1.5em;
  text-align: center;
  padding: 0;
  position: absolute;
  bottom: 0.375em;
  right: 0.375em;
`;

export default memo(ImageUploader);
