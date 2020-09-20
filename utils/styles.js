export function removeStyles(elem, styleNames) {
	if(elem.style) {
		styleNames.forEach(name => {
			if(elem.style.removeProperty) {
				elem.style.removeProperty(name);
			} else {
				elem.style[name] = null;
			}
		})
	}
}