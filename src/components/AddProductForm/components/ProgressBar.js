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
import measurements from "../../../shared/measurements";

const ProgressBar = ({
  steps,
  activeStep,
  setActiveStep,
  subCategoryHasGroups,
}) => {
  const { contentDirection } = useContext(ContentDirectionContext);

  const { t } = useTranslation();

  const [error, setError] = useState(false);
  useEffect(
    function clearErrorAfterShortPeriod() {
      if (error) {
        setTimeout(function hideErrorMsg() {
          setError(false);
        }, time.delay.errorMsg);
      }
    },
    [error]
  );
  useEffect(() => {
    setError(false);
  }, [activeStep]);

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
          steps.map(({ translationKey, finished, id }) => (
            <Step key={id} data-opened={activeStep >= id}>
              <StepButton
                className="progressbar__button"
                type="button"
                onClick={(event) => handleStepClick(event, id)}
                onMouseDown={(event) => event.preventDefault()}
                contentDirection={contentDirection}
                finished={finished}
                inProgress={!finished && activeStep === id}
              >
                {t(strings, translationKey)}
              </StepButton>
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
const ProgressBarContainer = styled.div`
  /* width: 36em; */
  margin-bottom: 2.5em;
`;

const StyledProgressBar = styled.div`
  display: inline-flex;
  justify-content: space-between;
`;

const Step = styled.div`
  margin-right: 1px;

  &:first-child {
    .progressbar__button {
      border-top-left-radius: ${({ contentDirection }) =>
        contentDirection === "ltr"
          ? measurements.borderRadius.subtle
          : "initial"};
      border-bottom-left-radius: ${({ contentDirection }) =>
        contentDirection === "ltr"
          ? measurements.borderRadius.subtle
          : "initial"};
      border-top-right-radius: ${({ contentDirection }) =>
        contentDirection === "rtl"
          ? measurements.borderRadius.subtle
          : "initial"};
      border-bottom-right-radius: ${({ contentDirection }) =>
        contentDirection === "rtl"
          ? measurements.borderRadius.subtle
          : "initial"};

      ::before {
        border: none;
      }
    }
  }
`;

const StepButton = styled.button`
  color: ${({ finished, inProgress }) =>
    finished ? "#fff" : theme.text.darkGrey};
  background-color: ${({ finished, inProgress }) =>
    finished
      ? theme.bg.accent
      : inProgress
      ? theme.bg.accentLight
      : theme.bg.grey};
  border: none;
  padding: 0.5em 1.75em;
  position: relative;

  &::before,
  &::after {
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    border-top: 19px solid transparent;
    border-bottom: 17px solid transparent;
  }

  &::before {
    content: "";
    left: ${({ contentDirection }) =>
      contentDirection === "ltr" ? 0 : "initial"};
    right: ${({ contentDirection }) =>
      contentDirection === "rtl" ? 0 : "initial"};
    border-left: ${({ contentDirection }) =>
      contentDirection === "ltr" ? "17px solid #fff" : "initial"};
    border-right: ${({ contentDirection }) =>
      contentDirection === "rtl" ? "17px solid #fff" : "initial"};
  }

  &::after {
    content: "";
    right: ${({ contentDirection }) =>
      contentDirection === "ltr" ? "-17px" : "initial"};
    left: ${({ contentDirection }) =>
      contentDirection === "rtl" ? "-17px" : "initial"};
    border-left: ${({ contentDirection, finished, inProgress }) =>
      contentDirection === "ltr"
        ? `17px solid ${
            finished
              ? theme.bg.accent
              : inProgress
              ? theme.bg.accentLight
              : theme.bg.grey
          }`
        : "initial"};
    border-right: ${({ contentDirection, finished, inProgress }) =>
      contentDirection === "rtl"
        ? `17px solid ${
            finished
              ? theme.bg.accent
              : inProgress
              ? theme.bg.accentLight
              : theme.bg.grey
          }`
        : "initial"};
    z-index: 1;
  }
`;

export default memo(ProgressBar);
