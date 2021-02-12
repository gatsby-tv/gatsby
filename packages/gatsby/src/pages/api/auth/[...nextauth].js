/* eslint-disable */

import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { CJAYROSS_USER } from "@src/example";

const providers = [
  Providers.Credentials({
    name: "credentials",
    credentials: {},
    async authorize(credentials) {
      return CJAYROSS_USER;
    },
  }),
  Providers.GitHub({
    clientId: process.env.NEXTAUTH_GITHUB_ID,
    clientSecret: process.env.NEXTAUTH_GITHUB_SECRET,
  }),
];

const session = {
  jwt: true,
};

const jwt = {
  secret: process.env.NEXTAUTH_JWT_SECRET,
};

const callbacks = {
  signIn: async (user, account, profile) => {
    return Promise.resolve(true);
  },

  jwt: async (token, user, account, profile, isNewUser) => {
    if (user) {
      delete token.email;
      delete token.picture;
      token = { ...token, ...user };
    }

    return Promise.resolve(token);
  },

  session: async (session, token) => {
    session.user = token;
    return Promise.resolve(session);
  },
};

const options = {
  providers,
  session,
  jwt,
  callbacks,
  database: process.env.NEXTAUTH_DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
