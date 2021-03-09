import { DefaultTheme } from "styled-components";
import Color from "color";

export const DarkTheme: DefaultTheme = {
  colors: {
    font: {
      body: Color.rgb(255, 255, 255, 0.9),
      subdued: Color.rgb(255, 255, 255, 0.6),
      inverted: Color.rgb(0, 0, 0, 0.9),
    },

    background: {
      0: Color("#141414"),
      1: Color("#1a1a1a"),
      2: Color("#202020"),
      3: Color("#262626"),
      4: Color("#2c2c2c"),
      5: Color("#313131"),
    },

    inverted: {
      0: Color("#ebebeb"),
      1: Color("#e5e5e5"),
      2: Color("#dfdfdf"),
      3: Color("#d9d9d9"),
      4: Color("#d3d3d3"),
      5: Color("#cecece"),
    },

    shadow: {
      dark: Color.rgb(0, 0, 0, 0.9),
      light: Color.rgb(100, 100, 100, 0.9),
    },

    placeholder: Color.rgb(255, 255, 255, 0.1),
    popover: Color.rgb(80, 80, 80),
    error: Color("#de0017"),
    gold: Color("#b29b5c"),
    blue: Color("#6495ed"),
    pink: Color("#ed6495"),
    green: Color("#00853e"),
    white: Color("#fff"),
    black: Color("#010101"),
    trueblack: Color("#000"),
  },

  font: {
    0: "5.4rem",
    1: "3.6rem",
    2: "2.4rem",
    3: "1.8rem",
    4: "1.4rem",
    5: "1.3rem",
    6: "1.2rem",
  },

  icon: {
    smallest: "1.1rem",
    smaller: "1.5rem",
    small: "1.9rem",
    base: "2.3rem",
    large: "2.7rem",
    larger: "3.1rem",
    largest: "3.9rem",
  },

  avatar: {
    smallest: "3.2rem",
    smaller: "3.6rem",
    small: "4rem",
    base: "4.4rem",
    large: "4.8rem",
    larger: "5.2rem",
    largest: "7.2rem",
  },

  border: {
    radius: {
      none: "0",
      smallest: "0.2rem",
      small: "0.4rem",
      base: "0.6rem",
      large: "0.8rem",
      largest: "1rem",
      full: "100%",
    },

    width: {
      none: "0",
      smallest: "0.1rem",
      small: "0.2rem",
      base: "0.3rem",
      large: "0.4rem",
      largest: "0.5rem",
    },
  },

  spacing: {
    0: "0",
    0.5: "0.5rem",
    1: "1rem",
    1.5: "1.5rem",
    2: "2rem",
    3: "3rem",
    4: "4rem",
    5: "5rem",
    6: "6rem",
    7: "7rem",
    8: "8rem",
    9: "9rem",
    10: "10rem",
  },

  duration: {
    instant: 0,
    fastest: 100,
    faster: 200,
    fast: 300,
    base: 500,
    slow: 700,
    slower: 1000,
    slowest: 2000, 
  },

  lineHeight: {
    body: 1.5,
    heading: 1.2,
  },

  weight: {
    normal: 400,
    semiBold: 500,
    bold: 600,
  },
};

export const LightTheme: DefaultTheme = DarkTheme;
