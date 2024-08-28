"use client"

import axios from "axios";
import { useRouter } from "next/navigation";

interface ButtonCheckoutProps {
	priceId: string;
}

const ButtonCheckout = ({ priceId }: ButtonCheckoutProps) => {
	const route = useRouter()

	const checkout = async () => {
		const res = await axios.post("/api/checkout", { priceId });
		const data = await res.data;

		route.push(data.url)
	};

	return <button onClick={checkout} className="bg-sky-500 text-white px-4 py-2 rounded" >
		Buy
	</button >
};

export default ButtonCheckout;
