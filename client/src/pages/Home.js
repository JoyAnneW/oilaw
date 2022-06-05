import React from "react";
import ContactForm from "../components/ContactForm";
import Hero from "../components/Hero";

export default function Home() {
	return (
		<div>
			<Hero />
			<div className="my-6 text-center">
				<h1 className="text-5xl text-green-900 ">Tell us how we can help.</h1>
			</div>
			<ContactForm />
		</div>
	);
}
