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

// TODO: Use the loaded product data to display product info.

// TODO: Add the ability to reload the remote feed. When I do, clear the file input form and clear or replace the raw JSON output.

// TODO: Consider encapsulation.

// Important: This must remain a fully qualified remote URL to work locally.
const FEED_URL = 'https://bdsexton.github.io/williams-sonoma-coding-challenge/_assets/data/products.json';

var fileInputElement = document.getElementById('file-input');

var fileInputForm = document.getElementById('file-input-form');

var productData;

var resetButton = document.getElementById('file-input-reset');

if (isModernBrowser()) {

	// Note: This will not fire without a change, even if clearRawJSON() has
	// been called, so subsequent attempts to load the current file won't work.
	fileInputElement.addEventListener('change', handleFileInput);

	resetButton.addEventListener('click', () => {

		productData = null;

		clearRawJSON();
	});

	loadFeed(FEED_URL).then(

		(json) => {

			productData = json;

			displayRawJSON(json);
		}
	);
}

else {

	alert('Sorry, but this app requires a modern web browser. Please open it in a recent version of something like Chrome, Firefox, Opera, Edge, or Safari instead.');
}

function clearRawJSON() {

	document.getElementById('raw-data').textContent = '';
}

function displayRawJSON(json) {

	// TODO: There could be some more robust JSON validation here.

	if (typeof json === 'string') {

		console.log('[displayRawJSON] String received. Displaying unaltered.');

		document.getElementById('raw-data').textContent = json;
	}

	else if (typeof json === 'object') {

		// TODO: Handle failure, which could happen from objects that are not valid JSON.

		console.log('[displayRawJSON] Object received. Displaying stringified version.');

		document.getElementById('raw-data').textContent = JSON.stringify(json);
	}

	else {

		document.getElementById('raw-data').textContent = 'Uh oh! There seems to be a problem with the data, so it could not be displayed. Sorry about that!';
	}
}

function handleFileInput(event) {

	console.log('[handleFileInput] FileList length: ' + event.target.files.length);

	if (event.target.files.length > 0) {

		// Read the first file. Ignore any others.

		// Note: There should never be more than one file unless someone has
		// modified the HTML input element to allow multiple files.

		readFile(event.target.files[0]);
	}
}

function isModernBrowser() {

	/*
		For the purposes of this challenge, I'm just testing for a few specific
		things, but one might want to do things a bit differently for a
		production site (e.g., to better support old browsers). My tests and
		assumptions are as follows:

			• globalThis: Anything that supports globalThis is fairly recent.
			• window: Anything that supports the window object is a browser or a
			  browser-like app.
			• JSON and window.fetch: JSON object and fetch API support may be
			  safe to assume from the above, but let's be sure.

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

async function loadFeed(url) {

	// Obviously, a production site should handle errors more elegantly and
	// inform the user as appropriate.

	try {

		// {mode: 'no-cors'} can be used here, but it seems to make the feed inaccessible.

		let res = await fetch(url);

		if (res.status === 200) {

			console.log('[loadFeed] HTTP Status: 200 OK. Returning JSON.');

			return await res.json();
		}

		else {

			// TODO: Consider handling other statuses.

			console.log('[loadFeed] Uh oh. The fetch request did not return with the expected HTTP status (200).');
			console.log('[loadFeed] HTTP Status: ' + res.status);
			console.log('[loadFeed] HTTP Status Text: ' + res.statusText);	
		}

	} catch (error) {

		console.log(error);
	}
}

function readFile(file) {

	// TODO: Consider testing for application/json or maybe just using try/catch.
	// if (file.type !== 'application/json') {}

	let reader = new FileReader();

	reader.onload = function(event) {

		// let json = event.target.result;

		// productData = JSON.parse(json);

		displayRawJSON(event.target.result);
	};

	reader.readAsText(file);
}