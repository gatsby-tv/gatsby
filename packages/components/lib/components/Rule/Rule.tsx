import React from "react";
import styled, { css } from "styled-components";
import Color from "color";
import { useTheme } from "@gatsby-tv/utilities";

import { Flex } from "@lib/components/Flex";
import { Size, Margin } from "@lib/types";
import { cssProperty } from "@lib/styles/property";
import { cssSize, cssMargin } from "@lib/styles/size";
import { cssTextUppercase } from "@lib/styles/typography";

export interface RuleProps {
  children?: string | string[];
  font?: string;
  bg?: Color;
  fg?: Color;
  w?: Size;
  margin?: Margin;
  thin?: boolean;
}

const RuleStyle = styled.hr<Omit<RuleProps, "font" | "fg" | "children">>`
  border: none;
  height: ${(props) => (props.thin ? "1px" : "2px")};
  background-color: ${(props) =>
    props.bg?.toString() ?? props.theme.colors.background[3].toString()};
  ${(props) => cssSize("width", props.w)}
  ${(props) => cssMargin("margin", props.margin)}
`;

export function Rule(props: RuleProps): React.ReactElement {
  const { children, font, bg, fg, margin, thin, w = 1 } = props;
  const theme = useTheme();

  const text = css`
    ${cssTextUppercase}
    ${cssProperty("font-size", font)}
    color: ${fg?.toString() ?? theme.colors.font.subdued.toString()};
    text-align: center;
    vertical-align: middle;
    outline: none;
  `;

  if (children) {
    const leftRuleProps = {
      w: 1,
      bg,
      thin,
      margin: [
        theme.spacing[0],
        theme.spacing[1],
        theme.spacing[0],
        theme.spacing[0],
      ],
    };

    const rightRuleProps = {
      w: 1,
      bg,
      thin,
      margin: [
        theme.spacing[0],
        theme.spacing[0],
        theme.spacing[0],
        theme.spacing[1],
      ],
    };

    return (
      <Flex css={text} w={w} margin={margin} align="center">
        <RuleStyle {...leftRuleProps} />
        {children}
        <RuleStyle {...rightRuleProps} />
      </Flex>
    );
  } else {
    return <RuleStyle {...props} />;
  }
}
