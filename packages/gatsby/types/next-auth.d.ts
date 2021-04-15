import { Session, DefaultUser } from "next-auth";
import { User } from "@gatsby-tv/types";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface DefaultUser extends User {}

  interface User extends User {}
}
