import { memo, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { LayoutContext } from "../../../contexts/layout";
import SidebarToggler from "./SidebarToggler";
// import SvgDashboard from "../../../svgs/dashboard";
import SvgProducts from "../../../svgs/Products";
import SvgAdd from "../../../svgs/Add";
// import SvgSponsored from "../../../svgs/sponsored";
import rightArrow from "../../../img/right-arrow.svg";
import theme from "../../../shared/theme";
import { listStyles } from "../../List/style";
import measurements from "../../../shared/measurements";
import styled, { keyframes } from "styled-components";
import time from "../../../shared/time";
import useTranslation from "../../../hooks/useTranslation";
import translations from "../../../translations/strings/header";
import { LocaleContext } from "../../../contexts/locale";
import { ContentDirectionContext } from "../../../contexts/contentDirection";

const Item = ({ itemObject, expanded, index, locale, contentDirection }) => {
  const [contentVisible, setContentVisible] = useState(expanded);
  useEffect(
    function delayShowingContent() {
      let timer;
      if (expanded) {
        timer = setTimeout(() => {
          setContentVisible(true);
        }, 150);
      } else {
        setContentVisible(false);
      }

      return () => clearTimeout(timer);
    },
    [expanded]
  );

  const { value, label, Icon } = itemObject;
  const href = index === 0 ? `/${locale}` : `/${locale}/${value}`;

  const { asPath } = useRouter();
  const active = asPath === href;

  return (
    <StyledItem>
      <Link href={href} passHref>
        <StyledLink
          className={`sellerSidebar__${value}-link`}
          data-active={active}
          onMouseDown={(e) => e.preventDefault()}
          aria-label={value}
          contentDirection={contentDirection}
        >
          <Icon />
          {contentVisible && (
            <LinkText contentDirection={contentDirection}>{label}</LinkText>
          )}
          {contentVisible && !active && (
            <Arrow
              contentDirection={contentDirection}
              src={rightArrow}
              alt=""
            />
          )}
        </StyledLink>
      </Link>
    </StyledItem>
  );
};

const Sidebar = () => {
  const { locale } = useContext(LocaleContext);
  const { contentDirection } = useContext(ContentDirectionContext);

  const {
    sidebarExpanded: expanded,
    setSidebarExpanded: setExpanded,
  } = useContext(LayoutContext);

  const { t } = useTranslation();

  const items = [
    // { value: "dashboard", Icon: SvgDashboard },
    {
      value: "my-products",
      label: t(translations, "myProducts"),
      Icon: SvgProducts,
    },
    {
      value: "add-product",
      label: t(translations, "addProduct"),
      Icon: SvgAdd,
    },
    // {
    //   value: "sponsored-products",
    //   label: t(translations, "sponsoredProducts"),
    //   Icon: SvgSponsored,
    // },
  ];

  return (
    <StyledSidebar>
      <SidebarToggler onClick={() => setExpanded(!expanded)} />

      <List expanded={expanded} contentDirection={contentDirection}>
        {items.map((item, index) => (
          <Item
            index={index}
            key={item.value}
            itemObject={item}
            expanded={expanded}
            locale={locale}
            contentDirection={contentDirection}
          />
        ))}
      </List>
    </StyledSidebar>
  );
};

// styles
const StyledSidebar = styled.div``;

const List = styled.ul`
  ${listStyles}

  position: fixed;
  top: ${measurements.height.sellerHeader};
  left: ${(props) => (props.contentDirection === "ltr" ? "0" : "initial")};
  right: ${(props) => (props.contentDirection === "ltr" ? "initial" : "0")};
  bottom: 0;
  width: ${({ expanded }) =>
    expanded
      ? measurements.width.sidebar
      : measurements.width.sidebarCollapsed};
  background-color: ${theme.bg.secondary};
  border-top: 1px solid ${theme.border.shuttleGrey};
  box-shadow: 2px 0 5px 0 rgba(0, 0, 0, 0.15);

  transition: width ${time.transition.sidebar}s;
`;

const StyledItem = styled.li`
  &:last-child {
    border-bottom: 5px solid ${theme.border.shuttleGrey};
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${theme.text.manatee};
  text-transform: capitalize;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.border.shuttleGrey};
  transition-property: color, background-color;
  transition-duration: 0.1s;
  position: relative;

  .svg {
    width: 3.3em;
    padding: 1em;
    fill: ${theme.bg.manatee};
    transition: fill 0.1s;
  }

  &:hover,
  &:focus,
  &[data-active="true"] {
    color: #fff;

    /* .dashboardSvg {
      fill: #008cff;
    } */

    .productsSvg {
      fill: #008cff;
    }

    .addSvg {
      fill: #fed02f;
    }

    /* .sponsoredSvg {
      fill: #1fc876;
    } */
  }

  &:hover,
  &:focus {
    background-color: ${theme.bg.tuna};
    outline-color: #fff;
  }

  &[data-active="true"] {
    &::after {
      content: "";
      position: absolute;
      right: ${(props) => (props.contentDirection === "ltr" ? "0" : "initial")};
      left: ${(props) => (props.contentDirection === "ltr" ? "initial" : "0")};
      top: 0;
      bottom: 0;
      width: 5px;
    }

    /* &.sellerSidebar__dashboard-link::after {
      background-color: #008cff;
    } */

    &.sellerSidebar__my-products-link::after {
      background-color: #008cff;
    }

    &.sellerSidebar__add-product-link::after {
      background-color: #fed02f;
    }

    /* &.sellerSidebar__sponsored-products-link::after {
      background-color: #1fc876;
    } */
  }
`;

const show = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1
  }
`;

const LinkText = styled.span`
  margin-right: ${(props) =>
    props.contentDirection === "ltr" ? "auto" : "initial"};
  margin-left: ${(props) =>
    props.contentDirection === "ltr" ? "initial" : "auto"};

  animation: ${show} 0.1s both;
`;

const Arrow = styled.img`
  width: 0.75em;
  margin-right: ${(props) =>
    props.contentDirection === "ltr" ? "1em" : "initial"};
  margin-left: ${(props) =>
    props.contentDirection === "ltr" ? "initial" : "1em"};
  transform: ${(props) =>
    props.contentDirection === "rtl" ? "rotate(180deg)" : "initial"};

  animation: ${show} 0.3s both;
`;

export default memo(Sidebar);
