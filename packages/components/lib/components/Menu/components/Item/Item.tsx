import React from "react";
import styled from "styled-components";
import { ifExists, useTheme } from "@gatsby-tv/utilities";

import { TextBox } from "@lib/components/TextBox";
import { Flex } from "@lib/components/Flex";
import { Connected } from "@lib/components/Connected";
import { Optional } from "@lib/components/Optional";
import { Icon } from "@lib/components/Icon";
import { Button, ButtonProps } from "@lib/components/Button";
import { IconSource } from "@lib/types";

export type ItemProps = { children?: React.ReactNode; icon?: IconSource } & Omit<ButtonProps, "unstyled">;

export function Item(props: ItemProps): React.ReactElement {
  const theme = useTheme();
  const { children, icon: IconComponent, ...rest } = props;

  const flexProps = {
    active: ifExists(IconComponent),
    $props: {
      gap: theme.spacing[1],
    },
  };

  const IconMarkup = IconComponent ? (
    <Icon src={IconComponent} w={theme.icon.smaller} />
  ) : null;

  return (
    <Connected.Item>
      <Button unstyled {...rest}>
        <Optional component={Flex} {...flexProps}>
          {IconMarkup}
          <TextBox font={theme.font[4]} weight={600}>
            {children}
          </TextBox>
        </Optional>
      </Button>
    </Connected.Item>
  );
}
