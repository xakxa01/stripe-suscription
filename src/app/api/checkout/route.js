import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req) => {
	try {
		const { priceId } = await req.json();

		if (!process.env.STRIPE_API_SECRET) {
			throw new Error("Falta la clave secreta de Stripe en el entorno.");
		}

		const stripe = new Stripe(process.env.STRIPE_API_SECRET, {
			apiVersion: '2023-08-16', // Asegúrate de usar la versión correcta de la API de Stripe
		});

		const { origin } = new URL(req.url); // Obtener el origen desde la solicitud

		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			payment_method_types: ["card"],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			success_url: `${origin}/success`,
			cancel_url: `${origin}/`,
		});

		return NextResponse.json(session);
	} catch (error) {
		console.error("Error en la creación de la sesión de Stripe:", error);
		return NextResponse.error();
	}
};
