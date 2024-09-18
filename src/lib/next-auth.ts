import NextAuth, { NextAuthOptions } from 'next-auth';
import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    encode: async ({ secret, token }) => {
      const encodedToken = jwtSign(token, secret, {});
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const verify = jwtVerify(token, secret);
      return verify;
    },
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return new URL(baseUrl).toString();
    },
    async jwt({ token, user, account, profile }) {
      if (profile?.sub) {
        token.sub = profile.sub;
      }

      if (typeof user !== typeof undefined) {
        token.user = user;
      }

      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.expiresAt = account.expires_at; //seconds
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      const user = token.user as {
        id: string;
        firstName: string;
        lastName: string;
        orgId: string;
        metadata: {
          [key: string]: string;
        };
      };

      session.sub = token.sub;
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.expiresAt = token.expiresAt;
      session.error = token.error;
      session.user = user;

      return session;
    },
  },
  providers: [
    {
      id: 'zitadel',
      name: 'zitadel',
      type: 'oauth',
      version: '2',
      wellKnown: `${process.env.ZITADEL_ISSUER}/.well-known/openid-configuration`,
      authorization: {
        params: {
          scope: [
            'openid',
            'userinfo',
            'email',
            'profile',
            'address',
            'offline_access',
            'urn:zitadel:iam:user:resourceowner',
            'urn:zitadel:iam:org:projects:roles',
            'urn:zitadel:iam:org:project:id:zitadel:aud',
            `urn:zitadel:iam:org:id:${process.env.ZITADEL_ORG_ID}`,
            'urn:zitadel:iam:org:project:id:243317727832324237:aud', //myapp
            'urn:zitadel:iam:org:project:id:277340975477598167:aud', //otherteam
          ].join(' '),
        },
      },
      idToken: true,
      checks: ['pkce', 'state'],
      client: {
        token_endpoint_auth_method: 'none',
      },
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          loginName: profile.preferred_username,
          image: profile.picture,
          orgId: profile['urn:zitadel:iam:user:resourceowner:id'],
        };
      },
      clientId: process.env.ZITADEL_APP_CLIENT_ID,
      httpOptions: {
        timeout: 10000,
      },
    },
  ],
};

export const handler = NextAuth(authOptions);
