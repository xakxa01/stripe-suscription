import { NextResponse } from "next/server"
import { Stripe } from "stripe";

export const POST = async (req) => {
	const { priceId } = await req.json();

	const stripe = new Stripe(process.env.STRIPE_API_SECRET)
	const rootUrl = "http://localhost:3000"

	const session = await stripe.checkout.sessions.create({
		mode: "subscription",
		payment_method_types: ["card"],
		line_items: [{
			price: priceId,
			quantity: 1,
		}],
		success_url: `${rootUrl}/success`,
		cancel_url: `${rootUrl}/pricing`,
	})

	return NextResponse.json(session)
}