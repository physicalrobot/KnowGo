import React from "react";
import { Svg, Circle, Defs, ClipPath } from "react-native-svg";

const AbstractUserIcon = ({ width = 100, height = 100, fillColor = "#407EA6" }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 600 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Defs>
      <ClipPath id="circular-border">
        <Circle cx="300" cy="300" r="250" />
      </ClipPath>
    </Defs>
    <Circle cx="300" cy="300" r="280" fill={fillColor} />
    <Circle cx="300" cy="230" r="100" fill='#ffffff' />
    <Circle
      cx="300"
      cy="550"
      r="190"
      fill='#ffffff'
      clipPath="url(#circular-border)"
    />
  </Svg>
);

export default AbstractUserIcon;
