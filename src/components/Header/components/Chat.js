import { memo, forwardRef, useContext } from "react";
import ChatSvg from "../../../svgs/Chat";
import styled from "styled-components";
import { headerButtonStyles } from "../../Button/style";
import { ContentDirectionContext } from "../../../contexts/contentDirection";

const Chat = (props, ref) => {
  const contentDirection = useContext(ContentDirectionContext);

  return (
    <ChatContainer>
      <ChatToggler ref={ref} contentDirection={contentDirection}>
        <ChatSvg />
      </ChatToggler>
    </ChatContainer>
  );
};

// styles
const ChatContainer = styled.div``;

const ChatToggler = styled.button`
  ${headerButtonStyles}

  height: 3rem;
  padding: 0 1.05em;
  margin-right: ${(props) => (props.contentDirection === "ltr" ? "1em" : "0")};
  margin-left: ${(props) => (props.contentDirection === "ltr" ? "0" : "1em")};

  &:hover,
  &:focus {
    outline-color: #fff;

    .chatSvg {
      fill: #fff;
    }
  }

  .chatSvg {
    fill: transparent;
    stroke: #fff;
    stroke-width: 30;
    width: 1.3em;

    transition: fill 0.1s;
  }
`;

export default memo(forwardRef(Chat));
