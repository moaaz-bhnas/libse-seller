import { memo } from "react";
import styled from "styled-components";

const ChatSvg = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-25 -25 561.096 561.096"
      className="chatSvg"
    >
      <Path d="M74.414 480.548H38.2l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246C29.427 364.893 0 308.681 0 249.751 0 141.032 99.923 30.548 256.414 30.548c165.785 0 254.682 101.666 254.682 209.678 0 108.724-89.836 210.322-254.682 210.322-28.877 0-59.01-3.855-85.913-10.928-25.467 26.121-59.973 40.928-96.087 40.928z" />
    </Svg>
  );
};

const Svg = styled.svg``;

const Path = styled.path``;

export default memo(ChatSvg);
