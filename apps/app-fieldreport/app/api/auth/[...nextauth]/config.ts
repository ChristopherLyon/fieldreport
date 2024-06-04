import GoogleProvider from 'next-auth/providers/google';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';
import type { AuthOptions, User as NextAuthUser } from 'next-auth';
import type { JWT as NextAuthJWT } from 'next-auth/jwt';
import { ObjectId } from 'mongodb';

// Extend the User type to include the stripeCustomerId and _id properties
interface ExtendedUser extends NextAuthUser {
  stripeCustomerId?: string;
  _id?: ObjectId;
}

// Extend the JWT type to include the stripeCustomerId and _id properties
interface ExtendedJWT extends NextAuthJWT {
  stripeCustomerId?: string;
  _id?: ObjectId;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export const CONFIG: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    signIn: async ({ user }) => {
      const { db } = await connectToDatabase();
      let dbUser = await db.collection('users').findOne({ email: user.email });

      // If the user is not found in the database, create a new user and generate a new stripe customer id
      if (!dbUser) {
        console.log(
          'User not found in database, creating new user and stripe customer id',
        );
        // create stripe customer from email
        const customer = await stripe.customers.create({
          email: user.email ?? undefined,
        });

        // provision a new _id for the user
        const _id = new ObjectId();

        await db.collection('users').insertOne({
          _id: _id,
          email: user.email,
          name: user.name,
          stripeCustomerId: customer.id,
        });
        dbUser = await db.collection('users').findOne({ _id: _id });
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      // If this is the sign-in event where the user object is available
      if (user) {
        const { db } = await connectToDatabase();
        // Fetch the latest user data to get the Stripe Customer ID and _id
        const dbUser = await db
          .collection('users')
          .findOne({ email: user.email });
        if (dbUser) {
          (token as ExtendedJWT).stripeCustomerId = dbUser.stripeCustomerId as string;
          (token as ExtendedJWT)._id = dbUser._id;
        }

        // Set expiration time for the JWT for 1 week
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
      }
      return token;
    },
    session: ({ session, token }) => {
      // Add the Stripe Customer ID and _id to the session from the JWT token
      (session.user as ExtendedUser).stripeCustomerId = (
        token as ExtendedJWT
      ).stripeCustomerId;
      (session.user as ExtendedUser)._id = (token as ExtendedJWT)._id;
      return session;
    },
  },
};
