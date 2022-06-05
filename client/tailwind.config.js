// prettier-ignore
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				// tilde infront of folder makes this work and display on page. in dev tools the url references a different folder.
				'hero': "url('~/public/hero.png')",
			},
		},
	},
	plugins: [],
};
