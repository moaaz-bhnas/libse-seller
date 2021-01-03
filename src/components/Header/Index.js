import styled, { css } from "styled-components";
import { title } from "../../shared/data";
import TopBar from "./components/TopBar";
import { useContext } from "react";
import { ProfileContext } from "../../contexts/profile";

const Header = () => {
  const { profile } = useContext(ProfileContext);
  const isSeller = profile ? profile.isSeller : null;

  return (
    <StyledHeader seller={isSeller}>
      <Title>{title}</Title>

      <Navigation>
        <NavigationTitle>Navigation</NavigationTitle>
        <TopBar />
      </Navigation>
    </StyledHeader>
  );
};

// Styles
const unvisible = css`
  position: absolute;
  left: -100rem;
`;

const StyledHeader = styled.header`
  /* margin-bottom: 2em; */
  /* padding-top: ${({ seller }) => (seller ? "3em" : null)}; */
  padding-top: 3em;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  ${unvisible}
`;

const Navigation = styled.nav``;

const NavigationTitle = styled.h2`
  ${unvisible}
`;

export default Header;
