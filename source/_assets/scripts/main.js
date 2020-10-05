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

// TODO: Display a list of products with links to product info and show that list by default.

// TODO: Add the ability to reload the remote feed. When I do, clear the file input form and clear or replace the raw JSON output.

// TODO: Consider adding tests to isModernBrowser, including testing for HTML template element support.

/*----------------------------------------------------------------------------*\
	Setup
\*----------------------------------------------------------------------------*/

// Important: This must remain a fully qualified remote URL to work locally.
const FEED_URL = 'https://bdsexton.github.io/williams-sonoma-coding-challenge/_assets/data/products.json';

/*----------------------------------------------------------------------------*\
	Main
\*----------------------------------------------------------------------------*/

if (Utilities.isModernBrowser()) {

	new ProductGallery(FEED_URL);
}

else {

	alert('Sorry, but this app requires a modern web browser. Please open it in a recent version of something like Chrome, Firefox, Opera, Edge, or Safari instead.');
}