import { useContext } from "react";
import { ChannelModalContext, ChannelModalContextType } from "./context";

export function useChannelModal(): ChannelModalContextType {
  const context = useContext(ChannelModalContext);

  if (!context) {
    throw new Error("Channel modal context is missing for component.");
  }

  return context;
}
