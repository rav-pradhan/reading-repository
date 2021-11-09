module.exports = function(collection, rootDir) {
	const categories = collection.getFilteredByGlob(`${rootDir}/**/index.md`).map(markdownFile => {
		const bookMarkdown = collection.getFilteredByGlob(`${rootDir}/${markdownFile.fileSlug}/**.md`).filter(content => {
			return markdownFile.fileSlug !== content.fileSlug
		})
		return {
			slug: markdownFile.fileSlug,
			title: markdownFile.data.title,
			description: buildDescription(markdownFile.template.frontMatter.content),
			url: markdownFile.url,
			position: markdownFile.data.position,
			books: buildBooks(bookMarkdown, markdownFile.fileSlug, markdownFile.data.title)
		}
	})
	return sortByField(categories, "position")
}

function buildBooks(bookMarkdown, categorySlug) {
	return bookMarkdown.map(book => {
		return {
			category: categorySlug,
			title: book.data.title,
			link: book.data.link,
			image_url: book.data.image_url,
			author: book.data.author,
			url: book.url,
			slug: book.fileSlug,
			summary: book.data.summary,
		}
	})
}

function buildDescription(content) {
	const splitContent = content.split("\n").filter(str => str !== '')
	return splitContent.map(str => {
		return `${str}\n`
	})
}

function sortByField(array = [], field = "") {
    return array.sort((a, b) => {
        return a[field] - b[field]
    })
}
