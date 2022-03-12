import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next';
import { SanityAdapter, SanityCredentials } from 'next-auth-sanity';
import { client } from '../../../lib/sanity'



const options: NextAuthOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_AUTH_ID!,
      clientSecret: process.env.GOOGLE_AUTH_SECRET!,
    }),

    SanityCredentials(client)
  ],
  session: {
    jwt: true
  },
  adapter: SanityAdapter(client)
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);