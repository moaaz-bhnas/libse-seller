import { memo, useContext } from "react";
import Link from "next/link";
import { title } from "../../shared/data";
import styled from "styled-components";
import fonts from "../../shared/fonts";
import { ContentDirectionContext } from "../../contexts/contentDirection";
import { LocaleContext } from "../../contexts/locale";

const Logo = ({ fontSize, color, isSeller }) => {
  const { locale } = useContext(LocaleContext);
  const contentDirection = useContext(ContentDirectionContext);

  return (
    <Link passHref href={isSeller ? `/${locale}` : `/${locale}/login`}>
      <LogoLink contentDirection={contentDirection}>
        <LogoText fontSize={fontSize} color={color}>
          {title}
        </LogoText>
      </LogoLink>
    </Link>
  );
};

const LogoLink = styled.a`
  color: inherit;
  text-decoration: none;
  padding: 0.2em 0;
  display: flex;
  align-items: center;
  margin-right: ${(props) =>
    props.contentDirection === "ltr" ? "auto" : "initial"};
  margin-left: ${(props) =>
    props.contentDirection === "ltr" ? "initial" : "auto"};

  &:hover,
  &:focus {
    outline-color: #fff;
  }
`;

const LogoText = styled.span`
  font-family: ${fonts.serif};
  font-size: ${(props) => props.fontSize || "2rem"};
  color: ${(props) => props.color || "#fff"};
`;

export default memo(Logo);
