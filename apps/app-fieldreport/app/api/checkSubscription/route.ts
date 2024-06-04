import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';
export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { IStream, IUser } from '@/types/types';
import { redirect } from 'next/navigation';

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // Cast session.user to IUser
  const user = session.user as IUser;

  const stripeCustomerId = user.stripeCustomerId;
  let customerId = stripeCustomerId as string;

  // Check for active subscriptions
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'active',
    limit: 1,
  });

  if (subscriptions.data.length === 0) {
    console.log(user.email + ' does not have an active subscription');

    const freeStreamLimit = 5;
    const { db } = await connectToDatabase();
    const streams: IStream[] = await db
      .collection<IStream>('streams')
      .find({ user_id: user.email })
      .toArray();

    if (streams.length <= freeStreamLimit) {
      return NextResponse.json({
        activeSubscription: 'free trial',
        streams: streams.length,
        freeStreamLimit,
      });
    }

    // Create a checkout session for the user to subscribe
    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: process.env.NEXTAUTH_URL,
      cancel_url: process.env.NEXTAUTH_URL,
      customer: customerId,
      allow_promotion_codes: true,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
    });

    // Return subscription false and the checkout session URL
    return NextResponse.json({
      activeSubscription: false,
      url: checkoutSession.url,
    });
  }
  // Return subscription true
  return NextResponse.json({ activeSubscription: true });
}
