import { useGlobal, GlobalState } from "@gatsby-tv/utilities";

export function useUser(): GlobalState["user"] {
  const [{ user }, _] = useGlobal();
  return user;
}
