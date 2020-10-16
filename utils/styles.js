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

export function getSafeAreas(direction = 'top') {
	try {
		const safe = window.parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-' + direction));
		return typeof safe === 'number' && !isNaN(safe) ? safe : 0;
	} catch(e) {
		console.error('Не удалось добавить пустую зону отображения сверху', e);
		return 0;
	}
}

export function getAvailableColors() {
	return [
		'red',
		'pink',
		'purple',
		'deep-purple',
		'indigo',
		'blue',
		'light-blue',
		'cyan',
		'teal',
		'green',
		'light-green',
		'lime',
		'yellow',
		'amber',
		'orange',
		'deep-orange',
		'brown',
		'grey',
		'blue-grey'
	];
}

export function getRandomColor() {
	return getAvailableColors()[Math.floor(Math.random() * getAvailableColors().length)];
}

export function getColorByText(str) {
	const defaultColor = 'blue';
	if(typeof str !== 'string' || !str.length) {
		return defaultColor;
	}
	const texts = ['0123456789', 'abcdefghijklmnopqrstuvwxyz', 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'];
	const colors = getAvailableColors();
	for(let t = 0; t < texts.length; t++) {
		for(let l = 0; l < texts[t].length; l++) {
			if(new RegExp(texts[t][l], 'i').test(str[0])) {
				return colors[Math.floor(colors.length / texts[t].length * l)];
			}
		}
	}
	return defaultColor;
}

export function colorsToGradientValue(deg, ...colors) {
	return `linear-gradient(${deg}deg, ${colors.map((c, i) => `var(--${c}) ${Math.floor((i + 1) * (100 / colors.length))}%`).join(', ')})`;
}

export function changeColor(colorName, changeFactor) {
	if(colorName === 'white' || colorName === 'black') return colorName;
	const colorData = colorName.match(/(\w+)\-(\d+)/);
	if(colorData) {
		const [ string, color, mood ] = colorData;
		return color + '-' + (Number(mood) + changeFactor);
	} else {
		return colorName + '-' + (6 + changeFactor);
	}
}