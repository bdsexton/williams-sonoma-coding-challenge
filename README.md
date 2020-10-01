# Williams Sonoma Coding Challenge

This is my solution to a coding challenge from Williams Sonoma. You can view the [live demo](https://bdsexton.github.io/williams-sonoma-coding-challenge/) or download the code to pick apart and run at your leisure.

## Data Source

The [product data feed](https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json) specified in the project brief is served without an Access-Control-Allow-Origin response header, so it cannot be used directly per Cross-Origin Resource Sharing (CORS) restrictions. As a work-around, I have cached the feed data as a static file in the [project repository](https://github.com/bdsexton/williams-sonoma-coding-challenge/) and deployed the app via GitHub Pages, which does send the necessary header.

To enable [deployment](https://bdsexton.github.io/williams-sonoma-coding-challenge/_assets/data/products.json) via GitHub Pages there is a copy of the data feed file in both the <code>source</code> directory and the <code>docs</code> directory.

* [source/_assets/data/products.json](https://github.com/bdsexton/williams-sonoma-coding-challenge/blob/master/source/_assets/data/products.json)
* [docs/_assets/data/products.json](https://github.com/bdsexton/williams-sonoma-coding-challenge/blob/master/docs/_assets/data/products.json)

## Resources

I may not use all of these in the final version of my challenge solution, but I want to keep track of third-party resources I've considered and used during development.

### Fonts

* [Abril Fatface](https://fonts.google.com/specimen/Abril+Fatface)
* [Libre Baskerville](https://fonts.google.com/specimen/Libre+Baskerville)
* [Oswald](https://fonts.google.com/specimen/Oswald)

### Images

* [grass field photo](https://unsplash.com/photos/Ein9Zv7PXBw) by [Hari Nandakumar](https://unsplash.com/@hariprasad000)

### Tools and Services

* [GitHub Pages](https://pages.github.com/)
* [Grunt](https://gruntjs.com/)
* [Node.js](https://nodejs.org/)
* [Unsplash Source](https://source.unsplash.com/)