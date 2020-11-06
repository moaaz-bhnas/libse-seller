import { memo, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import useTranslation from "../../../hooks/useTranslation";
import measurements from "../../../shared/measurements";
import theme from "../../../shared/theme";
import { rectButton } from "../../Button/style";
import ImageCropperModal from "./ImageCropperModal";
import translations from "../../../translations/strings/addProductPage";

const ImageUploader = ({ gallery, AddImageToColor }) => {
  const imageInputRef = useRef(null);
  const { t } = useTranslation();
  const [src, setSrc] = useState(null);

  const handleSelectImage = useCallback((event) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    console.log("file: ", file);
    const reader = new FileReader();
    reader.addEventListener("load", () => setSrc(reader.result));
    reader.readAsDataURL(file);
  }, []);

  return (
    <Container>
      <Input
        id="imageInput"
        type="file"
        accept="image/*"
        multiple={false}
        onChange={handleSelectImage}
        ref={imageInputRef}
      />
      <Label htmlFor="imageInput" className="imageInput__label">
        {t(translations, "chooseImage")}
      </Label>
      {src && (
        <ImageCropperModal
          src={src}
          setSrc={setSrc}
          imageInputRef={imageInputRef}
          AddImageToColor={AddImageToColor}
        />
      )}

      <Gallery>
        {gallery.map((item, index) => (
          <Item key={index}>
            <Image src={item.url} alt="product image" />
          </Item>
        ))}
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

const Label = styled.label`
  ${rectButton}
  font-weight: normal;
  text-transform: initial;
  margin-bottom: 1em;
`;

const Input = styled.input`
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
`;

const Item = styled.li`
  flex: 0 0 25%;
`;

const Image = styled.img`
  max-width: 100%;
`;

export default memo(ImageUploader);
