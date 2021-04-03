import React from "react";

import {
  User,
  UserSkeletonProps,
  isUserSkeletonProps,
} from "./components/User";
import {
  Channel,
  ChannelSkeletonProps,
  isChannelSkeletonProps,
} from "./components/Channel";
import {
  Content,
  ContentSkeletonProps,
  isContentSkeletonProps,
} from "./components/Content";

export type SkeletonProps =
  | UserSkeletonProps
  | ChannelSkeletonProps
  | ContentSkeletonProps;

export function Skeleton(props: SkeletonProps): React.ReactElement {
  if (isUserSkeletonProps(props)) {
    return <User.Skeleton {...props} />;
  } else if (isContentSkeletonProps(props)) {
    return <Content.Skeleton {...props} />;
  } else if (isChannelSkeletonProps(props)) {
    return <Channel.Skeleton {...props} />;
  } else {
    throw new Error("Info.Skeleton component is missing props.");
  }
}
