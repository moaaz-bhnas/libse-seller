import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ImageCropper from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import styled from "styled-components";
import measurements from "../../../shared/measurements";
import theme from "../../../shared/theme";
import closeIcon from "../../../img/cross.svg";
import useTranslation from "../../../hooks/useTranslation";
import translations from "../../../translations/strings/addProductPage";
import { title3 } from "../../Title/style";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import { rectButton } from "../../Button/style";
import growIcon from "../../../img/grow.svg";
import shrinkIcon from "../../../img/shrink.svg";

const ImageCropperModal = ({ src, setSrc, imageInputRef, setCroppedImage }) => {
  const closerRef = useRef(null);
  const resizerRef = useRef(null);
  const imageRef = useRef(null);
  const url = useRef(null);

  const { t } = useTranslation();
  const { contentDirection } = useContext(ContentDirectionContext);
  const [crop, setCrop] = useState({
    unit: "%",
    aspect: 5 / 6,
  });
  const [imageIsWide, setImageIsWide] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    resizerRef.current.focus();
    return () => {
      document.body.style.overflow = "initial";
      imageInputRef.current.focus();
    };
  }, []);

  const handleResizerChange = useCallback(
    ({ target: { value } }) => {
      const cropCopy = Object.assign({}, crop);
      if (imageIsWide) {
        cropCopy.height = Number(value);
        delete cropCopy.width;
      } else {
        cropCopy.width = Number(value);
        delete cropCopy.height;
      }
      setCrop(cropCopy);
    },
    [crop, imageIsWide]
  );

  const handleImageLoaded = useCallback((img) => {
    imageRef.current = img;
    const cropCopy = Object.assign({}, crop);
    const imageIsWide = img.width / img.height > cropCopy.aspect;
    setImageIsWide(imageIsWide);

    if (imageIsWide) {
      cropCopy.height = 100;
      const width = ((img.height * cropCopy.aspect) / img.width) * 100;
      cropCopy.y = 0;
      cropCopy.x = (100 - width) / 2;
    } else {
      cropCopy.width = 100;
      const height = (img.width / cropCopy.aspect / img.height) * 100;
      cropCopy.x = 0;
      cropCopy.y = (100 - height) / 2;
    }

    setCrop(cropCopy);

    return false;
  }, []);

  const handleKeyDown = useCallback(
    (event, firstInteractive, lastInteractive, close) => {
      const { target, key, shiftKey } = event;

      if (key === "Tab" && shiftKey && target === firstInteractive) {
        event.preventDefault();
        lastInteractive.focus();
      }

      if (key === "Tab" && !shiftKey && target === lastInteractive) {
        event.preventDefault();
        firstInteractive.focus();
      }

      if (key === "Escape") {
        close();
      }
    },
    []
  );

  const makeClientCrop = useCallback(async (crop) => {
    const croppedImage = await getCroppedImg(
      imageRef.current,
      crop,
      "cropped-image.jpeg"
    );
    setCroppedImage(croppedImage);
  }, []);

  const getCroppedImg = useCallback((image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        console.log("blob: ", blob);
        blob.name = fileName;
        window.URL.revokeObjectURL(url.current);
        url.current = window.URL.createObjectURL(blob);
        resolve({ file: blob, url: url.current });
      }, "image/jpeg");
    });
  }, []);

  return (
    <Container>
      <Overlay aria-hidden="true" onClick={() => setSrc(null)} />

      <Modal
        role="dialog"
        aria-modal="true"
        aria-label="Crop image"
        tabIndex="0"
        onKeyDown={(event) =>
          handleKeyDown(event, closerRef.current, resizerRef.current, () =>
            setSrc(null)
          )
        }
      >
        <Header>
          <CloseButton
            type="button"
            onClick={() => setSrc(null)}
            ref={closerRef}
          >
            <CloseIcon src={closeIcon} alt={t(translations, "closeModal")} />
          </CloseButton>
          <Title contentDirection={contentDirection}>
            {t(translations, "cropImage")}
          </Title>
          <ApplyButton type="button">{t(translations, "apply")}</ApplyButton>
        </Header>

        <CropContainer>
          <ImageCropper
            src={src}
            crop={crop}
            imageAlt={t(translations, "productImage")} // to be dynamic
            locked
            imageStyle={{
              maxHeight: "70vh",
            }}
            onChange={(c, pc) => setCrop(pc)}
            onImageLoaded={handleImageLoaded}
            onComplete={makeClientCrop}
          />
        </CropContainer>

        <ResizeContainer>
          <Icon role="presentation" src={shrinkIcon} alt="" />
          <Resizer
            ref={resizerRef}
            aria-label="resize"
            type="range"
            min="80"
            max="100"
            value={
              typeof imageIsWide === "boolean"
                ? imageIsWide
                  ? crop.height
                  : crop.width
                : ""
            }
            onChange={handleResizerChange}
          />
          <Icon role="presentation" src={growIcon} alt="" />
        </ResizeContainer>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Modal = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: ${measurements.borderRadius.modal};
  width: 37.5em;
  /* max-height: 90vh; */

  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0.2em 0;
  border-bottom: 1px solid ${theme.border.grey};
`;

const CloseButton = styled.button`
  background-color: transparent;
  width: 3em;
  border: none;
  padding: 0.9em;

  &:hover {
    opacity: 0.6;
  }
`;

const CloseIcon = styled.img`
  width: 100%;
  vertical-align: middle;
`;

const Title = styled.h1`
  ${title3}
  margin: ${(props) =>
    props.contentDirection === "ltr" ? "0 auto 0 1em" : "0 1em 0 auto"};
`;

const ApplyButton = styled.button`
  ${rectButton};
  margin: 0 0.9em;
`;

const CropContainer = styled.div`
  background-color: ${theme.bg.primary};
  padding: 1em 0;
  border-bottom: 1px solid ${theme.bg.grey};

  display: flex;
  justify-content: center;
  align-items: center;

  .ReactCrop:focus {
    outline: -webkit-focus-ring-color auto 1px;
  }

  .ReactCrop__crop-selection {
    border: 5px solid ${theme.border.accent};
  }
`;

const ResizeContainer = styled.div`
  padding: 0.8em 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Resizer = styled.input`
  width: 18.75em;
  margin-left: 1em;
  margin-right: 1em;
`;

const Icon = styled.img`
  width: 1.15em;
`;

export default memo(ImageCropperModal);
