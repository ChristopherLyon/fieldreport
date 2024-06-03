import GoogleProvider from 'next-auth/providers/google';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';
import type { AuthOptions, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

// Extend the User type to include the stripeCustomerId property
interface ExtendedUser extends User {
  stripeCustomerId?: string;
}

// Extend the JWT type to include the stripeCustomerId property
interface ExtendedJWT extends JWT {
  stripeCustomerId?: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export const CONFIG: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
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

        await db.collection('users').insertOne({
          email: user.email,
          name: user.name,
          stripeCustomerId: customer.id,
        });
        dbUser = await db.collection('users').findOne({ email: user.email });
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      // If this is the sign-in event where the user object is available
      if (user) {
        const { db } = await connectToDatabase();
        // Fetch the latest user data to get the Stripe Customer ID
        const dbUser = await db
          .collection('users')
          .findOne({ email: user.email });

        if (dbUser && dbUser.stripeCustomerId) {
          (token as ExtendedJWT).stripeCustomerId = dbUser.stripeCustomerId;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Add the Stripe Customer ID to the session from the JWT token
      (session.user as ExtendedUser).stripeCustomerId = (
        token as ExtendedJWT
      ).stripeCustomerId;
      return session;
    },
  },
};
