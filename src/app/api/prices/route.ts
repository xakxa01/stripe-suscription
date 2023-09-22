import { NextResponse } from "next/server";
import Stripe from "stripe";

export const GET = async () => {
	const stripe = new Stripe(process.env.STRIPE_API_SECRET!, { apiVersion: "2023-08-16", })
	const prices = await stripe.prices.list()

	return NextResponse.json(prices.data);
};