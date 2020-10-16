import { memo } from "react";
import styled from "styled-components";

function SvgPrice(props) {
  return (
    <Svg className="svg priceSvg" viewBox="0 0 512 512" {...props}>
      <Path d="M272.067 241h-32.134c-18.307 0-33.2-14.893-33.2-33.199 0-18.307 14.894-33.2 33.2-33.2H304.2c8.284 0 15-6.716 15-15s-6.716-15-15-15H271v-33.2c0-8.284-6.716-15-15-15s-15 6.716-15 15v33.2h-1.066c-34.849 0-63.2 28.352-63.2 63.2S205.086 271 239.934 271h32.134c18.306 0 33.199 14.894 33.199 33.2 0 18.306-14.893 33.2-33.199 33.2h-64.267c-8.284 0-15 6.716-15 15s6.716 15 15 15H241v33.201c0 8.284 6.716 15 15 15s15-6.716 15-15V367.4h1.067c34.848 0 63.199-28.352 63.199-63.2S306.915 241 272.067 241z" />
    </Svg>
  );
}

const Svg = styled.svg``;

const Path = styled.path``;

export default memo(SvgPrice);
