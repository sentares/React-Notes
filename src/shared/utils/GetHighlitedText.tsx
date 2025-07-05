export const getHighlightedHtml = (
	html: string,
	highlight: string,
	start = false
): string => {
	if (!highlight) return html

	const escaped = highlight.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

	let htmlToProcess = html

	if (start) {
		const regex = new RegExp(`(${escaped})`, 'i')
		const match = html.match(regex)
		if (!match) return html
		const firstIndex = html.indexOf(match[0])
		htmlToProcess = html.slice(firstIndex)
	}

	const globalRegex = new RegExp(`(${escaped})`, 'gi')

	const parser = new DOMParser()
	const doc = parser.parseFromString(htmlToProcess, 'text/html')

	const walk = (node: Node) => {
		if (node.nodeType === Node.TEXT_NODE) {
			const text = node.nodeValue
			if (!text) return

			const replaced = text.replace(globalRegex, match => {
				return `<mark style="background-color: yellow;">${match}</mark>`
			})

			if (replaced !== text) {
				const span = document.createElement('span')
				span.innerHTML = replaced
				;(node as ChildNode).replaceWith(...Array.from(span.childNodes))
			}
		} else if (node.nodeType === Node.ELEMENT_NODE) {
			node.childNodes.forEach(walk)
		}
	}

	doc.body.childNodes.forEach(walk)

	return doc.body.innerHTML
}
