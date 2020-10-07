# Williams Sonoma Coding Challenge

This is my solution to a coding challenge from Williams Sonoma. You can view the [live demo](https://bdsexton.github.io/williams-sonoma-coding-challenge/) or download the code to pick apart and run at your leisure.

## :warning: Tuesday, October 6, 2020 Status Note - IMPORTANT!

Everything works, but I'm still improving things. For example, I plan to tighten up the layout in the overlay and add another transition or two. After those things I may turn my attention to testing and code quality improvements. Please feel free to check back for updates soon.

## My Approach

The challenge brief said to use any framework of my choice but to use plain JavaScript as much as possible for DOM handling, so the framework I chose to use was none at all. I just used plain JavaScript for the whole challenge to keep everything light and fast.

Skipping frameworks is one way to avoid bloated code and larger than necessary downloads, but to make things even leaner and faster I also implemented a simple build system with Grunt. It allows me to keep some files separate during development (which should enable easier unit testing) then combine and minify them for deployment.

 I would be happy to make another version with Vue 3 or whatever other framework you like. Just say the word.

## Viewing My Solution

The easiest way to see my solution running is by loading the [live demo](https://bdsexton.github.io/williams-sonoma-coding-challenge/) hosted by GitHub Pages.

You can also view, clone, and download the [project repository](https://github.com/bdsexton/williams-sonoma-coding-challenge) via GitHub.

### Project Dependencies

There are no external dependencies that need to be installed to use an already built version of the app, but you will need both [Node.js](https://nodejs.org/) and a [grunt-cli](https://github.com/gruntjs/grunt-cli) if you want to build it from source.

<code>grunt-cli</code> is meant to be installed globally like so:

```bash
npm install -g grunt-cli
```

Project-specific development dependencies may be installed from the repository's root directory like so:

```bash
npm install
```

### Building the Project

Actually building the project is easy:

```bash
grunt
```

The default task will clean out the <code>docs</code> directory then build a fresh copy of the project there. By the way, if that seems like a strange location for builds that's because it is! GitHub Pages uses that directory for deployments.

You can also run the <code>clean</code> and <code>build</code> tasks separately if you like:

```bash
grunt clean
```

```bash
grunt build
```

## Data Source

The [product data feed](https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json) specified in the project brief is served without an Access-Control-Allow-Origin response header, so it cannot be used directly per Cross-Origin Resource Sharing (CORS) restrictions. As a work-around, I have cached the feed data as a static file in the [project repository](https://github.com/bdsexton/williams-sonoma-coding-challenge) and deployed the app via GitHub Pages, which does send the necessary header.

To enable [deployment](https://bdsexton.github.io/williams-sonoma-coding-challenge/_assets/data/products.json) via GitHub Pages there is a copy of the data feed file in both the <code>source</code> directory and the <code>docs</code> directory.

* [source/_assets/data/products.json](https://github.com/bdsexton/williams-sonoma-coding-challenge/blob/master/source/_assets/data/products.json)
* [docs/_assets/data/products.json](https://github.com/bdsexton/williams-sonoma-coding-challenge/blob/master/docs/_assets/data/products.json)

## Testing

I would love to make some unit tests, but I have not yet done so.

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