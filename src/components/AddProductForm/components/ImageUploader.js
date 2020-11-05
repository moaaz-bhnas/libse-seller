import { memo, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import useTranslation from "../../../hooks/useTranslation";
import measurements from "../../../shared/measurements";
import theme from "../../../shared/theme";
import { rectButton } from "../../Button/style";
import ImageCropperModal from "./ImageCropperModal";
import translations from "../../../translations/strings/addProductPage";

const ImageUploader = () => {
  const imageInputRef = useRef(null);
  const { t } = useTranslation();
  const [src, setSrc] = useState(null);

  const handleSelectImage = useCallback((event) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
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
        />
      )}
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

export default memo(ImageUploader);
