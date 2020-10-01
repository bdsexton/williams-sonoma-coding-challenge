/* jshint node: true, esversion: 6 */

module.exports = function(grunt) {

	// Note: The build directory is currently also the release/deployment
	// directory.

	const BUILD_DIR = 'docs/';
	const SOURCE_DIR = 'source/';

	grunt.initConfig({

		clean: {
			build: [BUILD_DIR]
		},

		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd: SOURCE_DIR,
						src: ['_assets/data/**', '_assets/images/**'],
						dest: BUILD_DIR
					}
				]
			}
		},

		cssmin: {
			build: {
				files: {
					'docs/_assets/styles/main.min.css': [
						`${SOURCE_DIR}_assets/styles/main.css`
					]
				}
			}
		},

		htmlmin: {
			build: {
				options: {
					collapseWhitespace: true,
					removeComments: true
				},
				files: [
					{
						expand: true,
						cwd: SOURCE_DIR,
						src: ['*.html'],
						dest: BUILD_DIR
					}
				]
			}
		},

		terser: {
			build: {
				files: {
					'docs/_assets/scripts/main.min.js': [
						`${SOURCE_DIR}_assets/scripts/main.js`
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-terser');

	grunt.registerTask('build', ['htmlmin:build', 'cssmin:build', 'terser:build', 'copy', 'finalize-build']);

	grunt.registerTask('default', ['clean', 'build']);

	grunt.registerTask('finalize-build', 'Apply finishing touches to complete the build.', function() {

		updateFileNamesInHTML(`${BUILD_DIR}index.html`);

		restoreHeaderInCSS(`${SOURCE_DIR}_assets/styles/main.css`, `${BUILD_DIR}_assets/styles/main.min.css`);

		restoreHeaderInJS(`${SOURCE_DIR}_assets/scripts/main.js`, `${BUILD_DIR}_assets/scripts/main.min.js`);

		// GitHub Pages runs Jekyll by default, but this app doesn't need Jekyll
		// and Jekyll stops some files from being deployed, so disable it.
		disableJekyll(BUILD_DIR);
	});

	function disableJekyll(dir) {

		let file = `${dir}.nojekyll`;

		grunt.log.writeln(`Adding ${file}.`);

		grunt.file.write(file, '');
	}

	// TODO: Consider combining the restoreHeaderInCSS and restoreHeaderInJS functions.

	function restoreHeaderInCSS(sourceFile, targetFile) {

		let css;

		let headerMatches;
		let headerRegExp = /^(@charset "[^"]*";).*?\*\//s;

		css = grunt.file.read(sourceFile);

		headerMatches = headerRegExp.exec(css);

		if (headerMatches !== null) {

			grunt.log.writeln(`Restoring header in ${targetFile}.`);

			css = grunt.file.read(targetFile);

			// Replace the charset at-rule with the full header match.
			css = css.replace(headerMatches[1], headerMatches[0] + '\n');

			grunt.file.write(targetFile, css);

			return true;
		}

		else {

			grunt.log.writeln('CSS header not found. Unable to restore.');
		}

		return false;
	}

	function restoreHeaderInJS(sourceFile, targetFile) {

		let headerMatches;
		let headerRegExp = /^\/\*.*?\*\//s;

		let js = grunt.file.read(sourceFile);

		headerMatches = headerRegExp.exec(js);

		if (headerMatches !== null) {

			grunt.log.writeln(`Restoring header in ${targetFile}.`);

			js = grunt.file.read(targetFile);

			// Prepend the extracted header to the target source.
			js = headerMatches[0] + '\n' + js;

			grunt.file.write(targetFile, js);

			return true;
		}

		else {

			grunt.log.writeln('JavaScript header not found. Unable to restore.');
		}

		return false;
	}

	function updateFileNamesInHTML(file) {

		let html;

		html = grunt.file.read(file);

		grunt.log.writeln(`Replacing main.css with main.min.css in ${file}.`);

		html = html.replace(/\bmain\.css\b/, 'main.min.css');

		grunt.log.writeln(`Replacing main.js with main.min.js in ${file}.`);

		html = html.replace(/\bmain\.js\b/, 'main.min.js');

		grunt.file.write(file, html);
	}
};