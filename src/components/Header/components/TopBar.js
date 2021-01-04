import { memo, useCallback, useContext, useRef } from "react";
import styled from "styled-components";
import theme from "../../../shared/theme";
import measurements from "../../../shared/measurements";
import Logo from "../../Logo/Index";
import Chat from "./Chat";
import AccountDropdown from "./AccountDropdown";
import Sidebar from "./Sidebar";
import { clearButtonStyles } from "../../Button/style";
import { LocaleContext } from "../../../contexts/locale";
import { useRouter } from "next/router";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import { ProfileContext } from "../../../contexts/profile";

const TopBar = () => {
  const { profile } = useContext(ProfileContext);
  const isSeller = profile ? profile.isSeller : null;

  const router = useRouter();
  const { locale } = useContext(LocaleContext);

  const { contentDirection } = useContext(ContentDirectionContext);

  const setLocale = useCallback(() => {
    router.push(
      router.pathname,
      router.asPath.replace(locale, locale === "ar" ? "en" : "ar")
    );
  }, [locale]);

  const chatButtonRef = useRef(null);

  return (
    <StyledTopBar>
      {isSeller && <Sidebar />}
      <Logo />
      {isSeller && <Chat ref={chatButtonRef} />}
      {profile && (
        <AccountDropdown previousInteractiveElement={chatButtonRef} />
      )}
      <Button onClick={setLocale} contentDirection={contentDirection}>
        {locale === "ar" ? "English" : "العربية "}
      </Button>
    </StyledTopBar>
  );
};

// Styles
const StyledTopBar = styled.div`
  background-color: ${theme.bg.secondary};
  height: ${measurements.height.header};
  display: flex;
  padding: 0 1.05em;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Button = styled.button`
  ${clearButtonStyles}

  color: #fff;
  margin-left: ${(props) => (props.contentDirection === "ltr" ? "1em" : "0")};
  margin-right: ${(props) => (props.contentDirection === "ltr" ? "0" : "1em")};
  font-weight: 500;
  height: 3rem;
  transition: 0.1s opacity;

  &:hover,
  &:focus {
    opacity: 0.6;
    outline-color: #fff;
  }
`;

export default memo(TopBar);
