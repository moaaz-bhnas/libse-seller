import {
  memo,
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../../redux/actions/authActions";
import downArrow from "../../../img/down-arrow.svg";
import styled from "styled-components";
import theme from "../../../shared/theme";
import { headerButtonStyles } from "../../Button/style";
import { useRouter } from "next/router";
import useTranslation from "../../../hooks/useTranslation";
import capitalize from "../../../utils/capitalize";
import strings from "../../../translations/strings/header";
import { ContentDirectionContext } from "../../../contexts/contentDirection";
import { LocaleContext } from "../../../contexts/locale";
import { setProfile } from "../../../redux/actions/profileActions";
import { AuthContext } from "../../../contexts/auth";

const MenuItem = (props) => {
  const {
    index,
    activeIndex,
    itemsRefs,
    link,
    href,
    handleClick,
    value,
    icon,
  } = props;

  const menuItemProps = {
    role: "menuitem",
    id: `item${index + 1}`,
    tabIndex: activeIndex === index ? 0 : -1,
    ref: (el) => (itemsRefs.current[index] = el),
  };

  return (
    <>
      {link ? (
        <Link href={href} passHref>
          <MenuitemLink {...menuItemProps}>
            <MenuitemIcon src={icon} alt="" /> {value}
          </MenuitemLink>
        </Link>
      ) : (
        <MenuitemButton {...menuItemProps} onClick={handleClick}>
          {value}
        </MenuitemButton>
      )}
    </>
  );
};

const AccountDropdown = ({ previousInteractiveElement }) => {
  const router = useRouter();

  // locale
  const { locale } = useContext(LocaleContext);

  // translation
  const { t } = useTranslation();

  // content direction
  const contentDirection = useContext(ContentDirectionContext);

  // profile
  const { uid } = useContext(AuthContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProfile(uid));
  }, []);
  const profile = useSelector((state) => state.profile.profile);
  const firstName = profile && profile.username.split(" ")[0];

  // Refs
  const containerRef = useRef(null);
  const togglerRef = useRef(null);
  const itemsRefs = useRef([]);

  // state
  const [menuExpanded, setMenuExpanded] = useState(false);
  const handleClickOutside = useCallback(
    (event) => {
      const { target } = event;
      if (!containerRef.current.contains(target) && menuExpanded) {
        setMenuExpanded(false);
      }
    },
    [menuExpanded]
  );
  useEffect(
    function addClickOutsideHandler() {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    },
    [menuExpanded]
  );

  const [activeIndex, setActiveIndex] = useState(null);
  const handleTogglerKeyDown = useCallback((event) => {
    const { key } = event;
    if (key === "ArrowDown") {
      event.preventDefault();
      setMenuExpanded(true);
    }
    if (
      (key === "ArrowDown" || key === "Enter" || key === " ") &&
      !menuExpanded
    ) {
      setActiveIndex(0);
    }
  }, []);
  useEffect(() => {
    if (menuExpanded && Number.isInteger(activeIndex)) {
      if (activeIndex) {
        itemsRefs.current[activeIndex].focus();
      } else {
        setActiveIndex(0);
        itemsRefs.current[0].focus();
      }
    }
    if (!menuExpanded) {
      setActiveIndex(null);
    }
  }, [menuExpanded]);

  const handleMenuKeyDown = useCallback(
    (event) => {
      const { key, shiftKey } = event;
      const lastIndex = itemsRefs.current.length - 1;

      const moveToIndex = (newActiveIndex) => {
        event.preventDefault();
        setActiveIndex(newActiveIndex);
        itemsRefs.current[newActiveIndex].focus();
      };

      if (key === "ArrowUp") {
        const isFirstIndex = activeIndex === 0;
        if (isFirstIndex) {
          moveToIndex(lastIndex);
        } else {
          moveToIndex(activeIndex - 1);
        }
      } else if (key === "ArrowDown") {
        const isLastIndex = activeIndex === lastIndex;
        if (isLastIndex) {
          moveToIndex(0);
        } else {
          moveToIndex(activeIndex + 1);
        }
      } else if (key === "Escape") {
        setMenuExpanded(false);
        togglerRef.current.focus();
      } else if (shiftKey && key === "Tab") {
        event.preventDefault();
        setMenuExpanded(false);
        previousInteractiveElement.current.focus();
      } else if (key === "Tab") {
        setMenuExpanded(false);
      }
    },
    [activeIndex]
  );

  const items = [
    {
      value: t(strings, "logout"),
      link: false,
      handleClick: () =>
        dispatch(signOut({ callback: () => router.push(`/${locale}/login`) })),
    },
  ];

  return (
    <DropdownContainer ref={containerRef}>
      <DropdownToggler
        aria-label="toggle account menu"
        aria-haspopup="true"
        aria-expanded={menuExpanded}
        aria-controls="accountMenu"
        ref={togglerRef}
        onClick={() => setMenuExpanded(!menuExpanded)}
        onKeyDown={handleTogglerKeyDown}
      >
        {t(strings, "hi")} {capitalize(firstName)}
        <DownArrow contentDirection={contentDirection} src={downArrow} alt="" />
      </DropdownToggler>

      <DropdownMenu
        id="accountMenu"
        role="menu"
        aria-label="account menu"
        aria-activedescendant={
          Number.isInteger(activeIndex) ? `item${activeIndex + 1}` : null
        }
        visible={menuExpanded}
        onKeyDown={handleMenuKeyDown}
        contentDirection={contentDirection}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            index={index}
            activeIndex={activeIndex}
            id={`item${index + 1}`}
            itemsRefs={itemsRefs}
            link={item.link}
            href={item.href}
            handleClick={item.handleClick}
            icon={item.icon}
            value={item.value}
          />
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

// styles
const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownToggler = styled.button`
  ${headerButtonStyles}
  font-weight: 700;
  color: #fff;
  height: 3rem;
  transition: 0.1s opacity;

  &:hover,
  &:focus {
    opacity: 0.6;
    outline-color: #fff;
  }
`;

const DownArrow = styled.img`
  width: 0.85em;
  margin-left: ${(props) => (props.contentDirection === "ltr" ? ".8em" : "0")};
  margin-right: ${(props) => (props.contentDirection === "ltr" ? "0" : ".8em")};
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: ${(props) => (props.contentDirection === "ltr" ? "0" : "initial")};
  left: ${(props) => (props.contentDirection === "ltr" ? "initial" : "0")};
  transform: translateX(0);
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  background-color: #fff;
  width: 15em;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    right: ${(props) => (props.contentDirection === "ltr" ? "3em" : "initial")};
    left: ${(props) => (props.contentDirection === "ltr" ? "initial" : "3em")};
    transform: translate(0, -50%) rotate(45deg);
    width: 0.8rem;
    height: 0.8rem;
    background-color: #fff;
  }
`;

const MenuitemLink = styled.a`
  text-decoration: none;
  color: inherit;
  padding: 0.5em;

  display: flex;
  align-items: center;

  transition-property: font-weight, background-color;
  transition-duration: 0.1s;

  &:hover,
  &:focus,
  &[tabindex="0"] {
    font-weight: 700;
    background-color: ${theme.bg.grey};
  }

  &:nth-last-child(2) {
    border-bottom: 2px solid ${theme.border.grey};
  }
`;

const MenuitemButton = styled.button`
  ${headerButtonStyles}
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${theme.text.interactive};
  padding: 1.1em 0;

  &:hover,
  &:focus,
  &[tabindex="0"] {
    background-color: #fbf2f0;
  }
`;

const MenuitemIcon = styled.img`
  width: 1.8em;
  margin-right: 0.9em;
`;

export default memo(AccountDropdown);
