import { memo, useContext } from "react";
import Header from "../Header/Index";
import styled from "styled-components";
import { LayoutContext } from "../../contexts/layout";
import measurements from "../../shared/measurements";
import time from "../../shared/time";
import { ContentDirectionContext } from "../../contexts/contentDirection";
import { useSelector } from "react-redux";
import { ProfileContext } from "../../contexts/profile";
import { AuthContext } from "../../contexts/auth";

const Layout = ({ children }) => {
  const { profile } = useContext(ProfileContext);
  const isSeller = profile ? profile.isSeller : null;
  const { sidebarExpanded } = useContext(LayoutContext);

  const { contentDirection } = useContext(ContentDirectionContext);

  return (
    <StyledLayout dir={contentDirection}>
      <Header />

      <Main>
        <Wrapper
          seller={isSeller}
          sidebarExpanded={sidebarExpanded}
          contentDirection={contentDirection}
        >
          {children}
        </Wrapper>
      </Main>
    </StyledLayout>
  );
};

const StyledLayout = styled.div``;

const Wrapper = styled.div`
  max-width: ${({ seller }) =>
    seller
      ? measurements.maxWidth.wrapper
      : measurements.maxWidth.smallWrapper};
  margin: 0 auto;
  padding-left: ${({ seller, sidebarExpanded, contentDirection }) =>
    seller && contentDirection === "ltr"
      ? sidebarExpanded
        ? measurements.width.sidebar
        : measurements.width.sidebarCollapsed
      : null};
  padding-right: ${({ seller, sidebarExpanded, contentDirection }) =>
    seller && contentDirection === "rtl"
      ? sidebarExpanded
        ? measurements.width.sidebar
        : measurements.width.sidebarCollapsed
      : null};
  transition-property: padding-left, padding-right;
  transition-duration: ${time.transition.sidebar}s;
`;

const Main = styled.main``;

export default memo(Layout);
