/*============================================================================*\

	JavaScript by Brian Sexton for the Williams Sonoma Coding Challenge

	------------------------------------------------------------------------

	Brian Sexton - https://briansexton.com/

	Main Portfolio - https://brian.works/

	Writing Portfolio - https://wellwritten.work/

	Résumé and Supplemental Documents - https://brian.works/resume

	------------------------------------------------------------------------

	Please Note: This is work in progress and not yet feature-complete!

\*============================================================================*/

class Utilities {

	static isModernBrowser() {

		/*
			For the purposes of this challenge, I'm just testing for a few
			specific things, but one might want to do things a bit differently
			for a production site (e.g., to better support old browsers). My
			tests and assumptions are as follows:
	
				• globalThis: Anything that supports globalThis is fairly
				  recent.
				• window: Anything that supports the window object is a browser
				  or a browser-like app.
				• JSON and window.fetch: JSON object and fetch API support may
				  be safe to assume from the above, but let's be sure.
	
			Feature Support Reference:
				https://www.caniuse.com/mdn-javascript_builtins_globalthis
				https://www.caniuse.com/json
				https://www.caniuse.com/fetch
		*/
	
		if (!globalThis || !window || !window.fetch) {
	
			return false;
		}
	
		return true;
	}

	static formatPrice(price) {

		return new Intl.NumberFormat('us-EN', {style: 'currency', currency: 'USD'}).format(price);
	}
}