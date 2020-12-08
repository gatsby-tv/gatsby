import React from "react";
import { Frame } from "@gatsby-tv/components";

import { Topbar } from "@src/components/Topbar";
import { Stream } from "@src/components/Stream";
import { Preview } from "@src/components/Preview";
import { useUser } from "@src/utilities/use-user";

export default function IndexPage() {
  const user = useUser();

  return (
    <Frame topbar={<Topbar />}>
    </Frame>
  );
}
