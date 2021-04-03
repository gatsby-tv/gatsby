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

import { Skeleton, SkeletonProps } from "./Skeleton";

export type InfoHeaderProps = UserProps | ChannelProps;

function InfoHeaderBase(props: InfoHeaderProps): React.ReactElement {
  if (isUserProps(props)) {
    return <User {...props} />;
  } else if (isChannelProps(props)) {
    return <Channel {...props} />;
  } else {
    throw new Error("InfoHeader component is missing props.");
  }
}

export const InfoHeader = Object.assign(InfoHeaderBase, {
  Skeleton,
  displayName: "InfoHeader",
});
