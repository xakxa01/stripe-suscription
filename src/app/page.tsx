"use client"

import ButtonCheckout from "@/components/ButtonCheckout";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = () => {
		const [prices, setPrices] = useState([]);

	useEffect(() => {
		axios.get("/api/prices")
			.then((res) => {
				const sortedPrices = res.data.sort((a: any, b: any) => a.unit_amount - b.unit_amount);
				setPrices(sortedPrices);
			});
	}, []);

	return <div className="flex justify-center items-center h-screen">
		<div>
			<header>
				<h1 className="text-center my-5">Pricing</h1>
			</header>

			<div className="flex gap-x-2">
				{!prices ? null : prices.map((price: any) => (
					<div key={price.id} className="bg-slate-300 mb-2 p-7">
						<h3>{price.nickname}</h3>
						<h2 className="text-3xl font-bold">{price.unit_amount / 100}$</h2>
						<ButtonCheckout priceId={price.id} />
					</div>
				))}
			</div>
		</div>
	</div>
}

export default Home;
