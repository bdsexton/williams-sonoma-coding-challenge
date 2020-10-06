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

class ProductGallery {

	constructor(feedUrl) {

		this.feedUrl = feedUrl;

		this.loadedData;

		// If a feed URL was provided, load that feed.

		if (this.feedUrl) {

			this.loadFeed(this.feedUrl).then(

				(json) => {

					// The promise should already resolve to an object, so it
					// be should not necessary to parse it manually.
					this.loadedData = json;

					// Automatically show the product menu.
					this.showProductMenu(this.loadedData.groups);
				}
			);
		}
	}

	addOverlay() {

		let template = document.getElementById('overlay-template');

		let overlay = template.content.cloneNode(true).querySelector('.overlay');

		let backdrop = overlay.querySelector('.backdrop');

		backdrop.addEventListener('click', () => {

			overlay.remove();
		});

		document.body.appendChild(overlay);

		return overlay;
	}

	buildProductBrowser(data) {

		// TODO: Consider passing a reference to all of the loaded data to facilitate easy navigation.

		let template = document.getElementById('product-browser-template');

		let productBrowser = template.content.cloneNode(true).querySelector('.product-browser');

		// header element variables

		let headerImageElement = productBrowser.querySelector('header .product-image');
		let headerNameElement = productBrowser.querySelector('header .product-name');
		let headerCloseButton = productBrowser.querySelector('header .close-button');

		// body element variables

		let imageElement = productBrowser.querySelector('.body .product-image');
		let priceElement = productBrowser.querySelector('.body .product-price');
		let productImagesElement = productBrowser.querySelector('.body .product-images');
	
		let imageListItem;
		let listImage;
	
		// Build the header.

		// Note: Header image element dimensions are omitted here because the
		// image and the CSS that overrides its natural size are both already
		// loaded by the time a dynamically added overlay is shown, so the
		// browser no longer needs HTML attribute values as hints to reserve
		// layout space.

		headerImageElement.setAttribute('src', data.hero.href);
		headerImageElement.setAttribute('alt', data.hero.alt || data.name);

		headerImageElement.addEventListener('click', () => {

			imageElement.setAttribute('src', data.hero.href);
			imageElement.setAttribute('alt', data.hero.alt || data.name);
			imageElement.setAttribute('width', data.hero.width);
			imageElement.setAttribute('height', data.hero.height);
		});

		headerNameElement.textContent = data.name;

		headerCloseButton.addEventListener('click', () => {

			let overlay = productBrowser.closest('.overlay');

			if (overlay) {

				overlay.remove();
			}
		});

		// Build the body.

		imageElement.setAttribute('src', data.hero.href);
		imageElement.setAttribute('alt', data.hero.alt || data.name);
		imageElement.setAttribute('width', data.hero.width);
		imageElement.setAttribute('height', data.hero.height);
	
		if (data.price) {

			priceElement.textContent = 'regularly ' + Utilities.formatPrice(data.price.regular) + ', currently ' + Utilities.formatPrice(data.price.selling) + ', ' + data.price.type;
		}

		else if (data.priceRange) {

			priceElement.textContent = 'regularly ' + Utilities.formatPrice(data.priceRange.regular.low) + ' to ' + Utilities.formatPrice(data.priceRange.regular.high) + ', currently ' + Utilities.formatPrice(data.priceRange.selling.low) + ' to ' + Utilities.formatPrice(data.priceRange.selling.high) + ', ' + data.priceRange.type;
		}

		else {

			// TODO: Consider hiding the price element when the price is unknown.
			priceElement.textContent = 'to be announced';
		}

		// TODO: Check whether any images actually exist then respond accordingly.
	
		for (let i = 0; i < data.images.length; i++) {
	
			imageListItem = document.createElement('li');
	
			listImage = document.createElement('img');
	
			listImage.setAttribute('src', data.images[i].href);
			listImage.setAttribute('alt', data.images[i].alt || data.name);
			listImage.setAttribute('width', data.images[i].width);
			listImage.setAttribute('height', data.images[i].height);
	
			listImage.addEventListener('click', () => {

				imageElement.setAttribute('src', data.images[i].href);
				imageElement.setAttribute('alt', data.images[i].alt || data.name);
				imageElement.setAttribute('width', data.images[i].width);
				imageElement.setAttribute('height', data.images[i].height);
			});

			imageListItem.appendChild(listImage);
	
			productImagesElement.appendChild(imageListItem);
		}

		// product page link

		let productPageLink = productBrowser.querySelector('.body .product-page-link a');

		if (data.links && data.links.www) {

			productPageLink.setAttribute('href', data.links.www);
			productPageLink.setAttribute('title', data.name);
		}

		else {

			productPageLink.parentElement.remove();
		}

		return productBrowser;
	}

	hideProductMenu(clear) {

		let productMenu = document.getElementById('product-menu');

		if (clear === true) {

			this.clearProductMenu();
		}

		productMenu.style.display = 'none';
	}

	buildProductMenu(data) {

		let productMenu = document.getElementById('product-menu');

		let productsElement = productMenu.querySelector('.products');

		let template = productsElement.querySelector('template');

		data.forEach(product => {

			let clone = template.content.cloneNode(true);

			let imageElement = clone.querySelector('.product-image');

			imageElement.setAttribute('src', product.hero.href);
			imageElement.setAttribute('width', product.hero.width);
			imageElement.setAttribute('height', product.hero.height);
			imageElement.setAttribute('alt', product.alt || product.name);
			imageElement.setAttribute('title', product.name);

			imageElement.addEventListener('click', () => this.showProduct(product));

			let nameElement = clone.querySelector('.product-name');

			nameElement.textContent = product.name;

			let regularPriceElement = clone.querySelector('.regular-price');
			let currentPriceElement = clone.querySelector('.current-price');

			let onSpecial = (product.price && product.price.type === 'special') || (product.priceRange && product.priceRange.type === 'special');

			// TODO: Find out which fields are meant to be provided when a product does NOT have special pricing.

			// regular price

			if (product.price && product.price.regular) {

				let prefix = (onSpecial ? '<del>' : '');
				let suffix = (onSpecial ? '</del>' : '');

				regularPriceElement.innerHTML = prefix + Utilities.formatPrice(product.price.regular) + suffix;
			}

			else if (product.priceRange && product.priceRange.regular && product.priceRange.regular.low && product.priceRange.regular.high) {

				let prefix = (onSpecial ? '<del>' : '');
				let suffix = (onSpecial ? '</del>' : '');

				regularPriceElement.innerHTML = prefix + Utilities.formatPrice(product.priceRange.regular.low) + '–' + Utilities.formatPrice(product.priceRange.regular.high) + suffix;
			}

			else {

				regularPriceElement.remove();
			}

			// selling price

			if (product.price && product.price.selling) {

				currentPriceElement.textContent = Utilities.formatPrice(product.price.selling);
			}

			else if (product.priceRange && product.priceRange.selling && product.priceRange.selling.low && product.priceRange.selling.high) {
	
				currentPriceElement.textContent = Utilities.formatPrice(product.priceRange.selling.low) + '–' + Utilities.formatPrice(product.priceRange.selling.high);
			}

			else
			{
				currentPriceElement.remove();
			}

			// product page link

			let productPageLink = clone.querySelector('.product-card .product-page-link a');

			if (product.links && product.links.www) {

				productPageLink.setAttribute('href', product.links.www);
				productPageLink.setAttribute('title', product.name);	
			}

			else {

				productPageLink.parentElement.remove();
			}

			productsElement.appendChild(clone);
		});
	}

	clearProductMenu() {

		let productElements = document.querySelectorAll('#product-menu .products li');

		productElements.forEach(element => {

			element.parentElement.removeChild(element);
		});
	}

	async loadFeed(url) {

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

	showProduct(product) {

		// Add a new overlay.

		let overlay = this.addOverlay();

		overlay.classList.add('product-image-overlay');

		// Build a new product browser then put it in the new overlay.

		let productBrowser = this.buildProductBrowser(product);

		overlay.querySelector('.content').appendChild(productBrowser);
	}

	showProductMenu(data) {

		let productMenu = document.getElementById('product-menu');

		let productElements = productMenu.querySelectorAll('.products > li');

		if (productElements.length === 0) {

			this.buildProductMenu(data);
		}

		productMenu.style.display = 'block';
	}
}