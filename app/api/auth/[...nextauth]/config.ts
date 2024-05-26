import GoogleProvider from "next-auth/providers/google";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import type { AuthOptions } from "next-auth";

//@ts-expect-error
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export const CONFIG: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",

  },
  callbacks: {
    signIn: async ({ user }) => {
      const { db } = await connectToDatabase();
      let dbUser = await db.collection("users").findOne({ email: user.email });

      // If the user is not found in the database, create a new user and generate a new stripe customer id
      if (!dbUser) {
        console.log(
          "User not found in database, creating new user and stripe customer id"
        );
        // create stripe customer from email
        const customer = await stripe.customers.create({
          email: user.email ?? undefined,
        });

        await db.collection("users").insertOne({
          email: user.email,
          name: user.name,
          stripeCustomerId: customer.id,
        });
        dbUser = await db.collection("users").findOne({ email: user.email });
      }
      return true;
    },


    jwt: async ({ token, user }) => {
      // If this is the sign-in event where the user object is available
      if (user) {
        const { db } = await connectToDatabase();
        // Fetch the latest user data to get the Stripe Customer ID
        const dbUser = await db
          .collection("users")
          .findOne({ email: user.email });
        token.stripeCustomerId = dbUser.stripeCustomerId;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Add the Stripe Customer ID to the session from the JWT token
      //@ts-ignore
      session.user.stripeCustomerId = token.stripeCustomerId;
      return session;
    },
  },
};
