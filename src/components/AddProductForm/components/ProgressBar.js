import { memo, useCallback, useState, useEffect, useContext } from "react";
import { ErrorMsg, ErrorIcon } from "../style";
import errorIcon from "../../../img/error.svg";
import time from "../../../shared/time";
import styled from "styled-components";
import theme from "../../../shared/theme";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import strings from "../../../translations/strings/addProductPage";
import useTranslation from "../../../hooks/useTranslation";
import translations from "../../../translations/strings/addProductPage";

const ProgressBar = ({
  steps,
  activeStep,
  setActiveStep,
  subCategoryHasGroups,
}) => {
  const contentDirection = useContext(ContentDirectionContext);

  const { t } = useTranslation();

  const [error, setError] = useState(false);
  useEffect(() => {
    if (error) {
      setTimeout(function hideErrorMsg() {
        setError(false);
      }, time.delay.errorMsg);
    }
  }, [error]);

  const handleStepClick = useCallback(
    (event, clickedStepId) => {
      event.preventDefault();

      const allPreviousStepsFinished = steps
        .filter((step) => step.id < clickedStepId)
        .every((step) => step.finished);
      if (allPreviousStepsFinished) {
        setActiveStep(clickedStepId);
      } else {
        setError(true);
      }
    },
    [steps]
  );

  const activeStepIsFinished = steps[activeStep - 1].finished; // -1 cause activeStep starts from 1 instead of 0
  return (
    <ProgressBarContainer>
      <StyledProgressBar>
        {steps &&
          steps
            .filter((step) => step.visible)
            .map(({ translationKey, Icon, id }) => (
              <Step key={id} data-opened={activeStep >= id}>
                <StepIconButton
                  type="button"
                  onClick={(event) => handleStepClick(event, id)}
                  className="progressbar__iconContainer"
                  onMouseDown={(event) => event.preventDefault()}
                  shortLine={subCategoryHasGroups}
                  contentDirection={contentDirection}
                >
                  <Icon />
                </StepIconButton>
                <StepText>{t(strings, translationKey)}</StepText>
              </Step>
            ))}
      </StyledProgressBar>

      {error && (
        <ErrorMsg className="progressbar__errMsg" role="alert">
          {activeStepIsFinished
            ? t(translations, "finishPrecedingSteps")
            : t(translations, "finishThisStep")}
          <ErrorIcon
            contentDirection={contentDirection}
            src={errorIcon}
            alt=""
          />
        </ErrorMsg>
      )}
    </ProgressBarContainer>
  );
};

// styles
export const ProgressBarContainer = styled.div`
  width: 36em;
  margin-bottom: 2.5em;
`;

export const StyledProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Step = styled.div`
  flex: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:last-child {
    .progressbar__iconContainer::after {
      display: none;
    }
  }

  &[data-opened="true"] {
    .progressbar__iconContainer {
      border-color: ${theme.bg.darkGrey};
      background-color: ${theme.bg.darkGrey};
    }

    .svg {
      fill: #fff;
    }
  }
`;

const borderColor = "#afaead";

export const StepIconButton = styled.button`
  width: 3em;
  height: 3em;
  padding: 0.6em;
  border-radius: 50%;
  background-color: #f0f0ef;
  border: 2px solid ${borderColor};
  position: relative;
  transition-property: border-color, background-color;
  transition-duration: 0.2s;

  .svg {
    width: 100%;
    fill: #646463;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: ${(props) => (props.shortLine ? "10em" : "15em")};
    height: 2px;
    background-color: ${borderColor};
    top: 50%;
    left: ${(props) =>
      props.contentDirection === "ltr" ? "2.5em" : "initial"};
    right: ${(props) =>
      props.contentDirection === "ltr" ? "initial" : "2.5em"};
    transform: translate(0, -50%);
    transition: background-color 0.2s;
  }
`;

export const StepText = styled.p`
  text-transform: capitalize;
`;

export default memo(ProgressBar);
