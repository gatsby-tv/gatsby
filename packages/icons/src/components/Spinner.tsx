import * as React from "react";

function SvgSpinner() {
  return (
    <svg id="gz-spinner" viewBox="0 0 540 540" width="1em" height="1em">
      <circle
        id="spinner"
        cx={270}
        cy={270}
        r={240}
        fill="none"
        stroke="currentColor"
        strokeDasharray="1440 1440"
        strokeDashoffset={0}
        strokeLinecap="butt"
        strokeWidth={60}
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="2s"
          repeatCount="indefinite"
          values="0;1370;0"
        />
        <animateTransform
          attributeName="transform"
          dur="1s"
          from="0 270 270"
          repeatCount="indefinite"
          to="360 270 270"
          type="rotate"
        />
      </circle>
    </svg>
  );
}

export default SvgSpinner;
