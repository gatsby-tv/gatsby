import * as React from "react";

function SvgGatsbyPlain() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="gz-svg-gatsby"
      aria-hidden="true"
      viewBox="0 0 540 540"
      width="1em"
      height="1em"
    >
      <g id="gatsby">
        <g id="brim">
          <path
            id="brim-underbrim"
            fill="#97844e"
            d="M0 417.25v19.507c-.001 50.318 120.882 91.11 270 91.11 149.117 0 270.001-40.792 270-91.11V417.25z"
          />
          <path
            id="brim-body"
            fill="#b29b5c"
            d="M540 417.25a270 91.109 0 01-270 91.11A270 91.109 0 010 417.25a270 91.109 0 01270-91.108 270 91.109 0 01270 91.109"
          />
          <path
            id="brim-shadow"
            fill="#000"
            d="M0 417.25h270v-91.108c-149.117 0-270 40.79-270 91.108z"
            opacity={0.15}
          />
        </g>
        <g id="crown">
          <path
            id="crown-body"
            fill="#b29b5c"
            d="M269.999 12.134c-102.717 0-186.17 20.777-186.17 20.777l23.416 383.987 325.51.346L456.17 32.911s-83.454-20.777-186.171-20.777z"
          />
          <path
            id="crown-decoration"
            fill="#fff"
            d="M269.93 326.142c-60.598.005-119.43 6.89-167.028 19.544l4.343 71.558h325.51l4.343-71.558c-47.618-12.66-106.477-19.544-167.099-19.544h-.07z"
          />
          <path
            id="crown-shadow"
            fill="#000"
            d="M164.75 18.854c-48.84 6.075-80.92 14.063-80.92 14.063l23.415 384.327 81.768.004-13.722-225.353-10.542-173.04z"
            opacity={0.15}
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgGatsbyPlain;
