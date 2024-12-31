/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		backgroundImage: {
			'landing-gradient': `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('frontend\src\assets\landing.png')`, // Replace with your image path
		  },
	  },
	},
	plugins: [],
  }