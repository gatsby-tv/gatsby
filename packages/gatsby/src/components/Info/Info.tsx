import React from "react";

import {
  User,
  UserProps,
  isUserProps,
} from "./components/User";
import {
  Channel,
  ChannelProps,
  isChannelProps,
} from "./components/Channel";
import {
  Content,
  ContentProps,
  isContentProps,
} from "./components/Content";

import { Skeleton, SkeletonProps } from "./Skeleton";

export type { SkeletonProps as InfoSkeletonProps };

export type InfoProps = UserProps | ChannelProps | ContentProps;

function InfoBase(props: InfoProps): React.ReactElement {
  if (isUserProps(props)) {
    return <User {...props} />;
  } else if (isContentProps(props)) {
    return <Content {...props} />
  } else if (isChannelProps(props)) {
    return <Channel {...props} />;
  } else {
    throw new Error("Info component is missing props.");
  }
}

export const Info = Object.assign(InfoBase, {
  Skeleton,
  displayName: "Info",
});
