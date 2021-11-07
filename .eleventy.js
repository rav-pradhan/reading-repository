const minifyHTML = require("./src/transforms/minifyHtml");
const markdownIt = require("markdown-it");

const isProduction = process.env.NODE_ENV === "production"
const resourceDirectory = "src/resources"

module.exports = (config) => {
	if (isProduction) {
		config.addTransform("htmlmin", minifyHTML)
	}

	config.setUseGitIgnore(false)

	// Collections
	config.addCollection("categories", (collection) => require('./src/transforms/buildCategories')(collection, resourceDirectory))

	config.addPassthroughCopy("src/resources/**/*.jpg")

	return {
		markdownTemplateEngine: "njk",
		dataTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		dir: {
			input: "src",
			output: "dist"
		}
	}
}
