"use client"

import axios from "axios";

interface ButtonCheckoutProps {
	priceId: string;
}

const ButtonCheckout = ({ priceId }: ButtonCheckoutProps) => {
	const checkout = async () => {
		const res = await axios.post("/api/checkout", { priceId });
		const data = await res.data;

		window.location.href = data.url;
	};

	return <button onClick={checkout} className="bg-sky-500 text-white px-4 py-2 rounded" >
		Buy
	</button >
};

export default ButtonCheckout;
