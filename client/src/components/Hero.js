import React from "react";
import { BsChevronDoubleDown } from "react-icons/bs";

export default function Hero() {
	return (
		<section className="bg-hero bg-cover bg-no-repeat bg-center h-[75vh] flex justify-center items-center">
			{/* tailwind arbitrary values. hero bg image in tailwind config */}
			<div className=" w-2/3 mx-auto flex flex-col justify-center items-center ">
				<div className="rounded-lg p-6 bg-orange-50 bg-opacity-50">
					<h1 className="text-5xl">We are here for you</h1>
					<p className="text-xl mt-2 p-1 rounded bg-orange-100 bg-opacity-60">
						Get free legal advice from licensed attorneys on cases related to
						<span className="font-bold"> immigration</span>,{" "}
						<span className="font-bold">criminal </span>or{" "}
						<span className="font-bold">family</span> law.
					</p>
				</div>
			</div>{" "}
		</section>
	);
}
