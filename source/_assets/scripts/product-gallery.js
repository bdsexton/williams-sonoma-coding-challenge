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

	buildProductMenu(data) {

		let productMenu = document.getElementById('product-menu');

		let productList = productMenu.querySelector('.products');

		let template = productList.querySelector('template');

		data.forEach(product => {

			let clone = template.content.cloneNode(true);

			let imageElement = clone.querySelector('.product-image');

			imageElement.setAttribute('src', product.hero.href);
			imageElement.setAttribute('width', product.hero.width);
			imageElement.setAttribute('height', product.hero.height);
			imageElement.setAttribute('alt', product.alt || product.name);
			imageElement.setAttribute('title', product.name);

			imageElement.addEventListener('click', () => this.showProduct(product));

			productList.appendChild(clone);
		});
	}

	clearProductBrowser() {

		let productElements = document.querySelectorAll('#product-browser .product');

		productElements.forEach(element => {

			element.parentElement.removeChild(element);
		});
	}

	clearProductMenu() {

		let productElements = document.querySelectorAll('#product-menu .products li');

		productElements.forEach(element => {

			element.parentElement.removeChild(element);
		});
	}

	displayProductInfo(data) {

		// TODO: Consider passing a reference to all of the loaded data to facilitate easy navigation.
	
		let productBrowser = document.getElementById('product-browser');
	
		let template = productBrowser.querySelector('template');
	
		let clone = template.content.cloneNode(true);
	
		let idElement = clone.querySelector('.product-id');
		let imageElement = clone.querySelector('.product-image');
		let infoElement = clone.querySelector('.product-info');
		let nameElement = clone.querySelector('.product-name');
		let priceElement = clone.querySelector('.product-price');
		let productImagesElement = clone.querySelector('.product-images');
		let productURLElement = clone.querySelector('.product-url');
	
		let imageListItem;
		let listImage;
	
		imageElement.setAttribute('src', data.hero.href);
		imageElement.setAttribute('alt', data.alt || data.name);
		imageElement.setAttribute('width', data.width);
		imageElement.setAttribute('height', data.height);
	
		idElement.textContent = data.id;
		nameElement.textContent = data.name;
		infoElement.textContent = 'number of images: ' + data.images.length;

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

		productURLElement.textContent = data.links.www;

		// TODO: Check whether any images actually exist then respond accordingly.
	
		for (let i = 0; i < data.images.length; i++) {
	
			imageListItem = document.createElement('li');
	
			listImage = document.createElement('img');
	
			listImage.setAttribute('src', data.images[i].href);
			listImage.setAttribute('alt', data.images[i].alt || data.name);
			listImage.setAttribute('width', data.images[i].width);
			listImage.setAttribute('height', data.images[i].height);
	
			imageListItem.appendChild(listImage);
	
			productImagesElement.appendChild(imageListItem);
		}
	
		productBrowser.appendChild(clone);
	}

	hideProductMenu(clear) {

		let productMenu = document.getElementById('product-menu');

		if (clear === true) {

			this.clearProductMenu();
		}

		productMenu.style.display = 'none';
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

		this.clearProductBrowser();

		this.displayProductInfo(product);
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