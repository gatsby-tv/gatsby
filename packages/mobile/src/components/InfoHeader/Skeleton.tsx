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

export type SkeletonProps = UserSkeletonProps | ChannelSkeletonProps;

export function Skeleton(props: SkeletonProps): React.ReactElement {
  if (isUserSkeletonProps(props)) {
    return <User.Skeleton {...props} />;
  } else if (isChannelSkeletonProps(props)) {
    return <Channel.Skeleton {...props} />;
  } else {
    throw new Error("InfoHeader.Skeleton component is missing props.");
  }
}
