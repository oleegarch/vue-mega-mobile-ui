import { getCoords, bindDirectiveEvents, bindEvents, unbindDirectiveEvents } from './events.js'



var currentContext;

function onMove(e) {
	const self = currentContext;
	if(self) {
		const coords = getCoords(e);
		const round10 = val => Math.floor(val / 10) * 10;
		if(
			!self.skewElementDownCoords ||
			round10(self.skewElementDownCoords.x) !== round10(coords.x) ||
			round10(self.skewElementDownCoords.y) !== round10(coords.y)
		) {
			self.moved = true;
		}
		if(self.isDown && !self.skewElementCurrentBinding.modifiers.onlyClick) {
			self.skewElement.style.transition = null;
			self.animate(e);
			e.stopPropagation();	
		}
	}
}

function onUp(e) {
	const self = currentContext;
	if(self) {
		if(self.isDown) {
			if(!self.skewElementCurrentBinding.modifiers.onlyClick) {
				if(self.animationEnded || self.moved) {
					self.clearAnimate();
				}
				self.createFallbackClick();
				e.stopPropagation();
			} else if(!self.moved) {
				self.skewElement.style.transition = 'transform 200ms ease';
				self.animate(e);
				self.createFallbackClick();
				e.stopPropagation();
			}
		}
		self.isDown = false;
	}
	currentContext = null;
}

bindEvents([
	['onUp', onUp],
	['onMove', onMove]
], {bindElem: window, bindForElem: window});



export default {
	bind: function(el, binding, vnode) {
		function animate(e) {
			const round = (value, nums = 2) => Number(value.toFixed(nums));
			const minMax = (min, max, value) => round(Math.max(min, Math.min(max, value)));
			const fromMinusToPlus = (max, value) => minMax(-(max / 2), max / 2, value);
			const coords = getCoords(e, this.skewElement);
			const minScale = 0.8;
			const maxScale = 1;
			const maxDegY = 30;
			const maxDegX = 60;
			const maxSkewX = 15;
			const width = this.skewElement.clientWidth;
			const height = this.skewElement.clientHeight;
			const centerX = width / 2;
			const centerXRatio = Math.abs(coords.offsetX - centerX) / centerX;
			const centerY = height / 2;
			const centerYRatio = Math.abs(coords.offsetY - centerY) / centerY;
			const ratioX = coords.offsetX / width;
			const ratioY = coords.offsetY / height;
			const degX = -fromMinusToPlus(maxDegX, (ratioY * maxDegX) - (maxDegX / 2));
			const degY = fromMinusToPlus(maxDegY, (ratioX * maxDegY) - (maxDegY / 2));
			const justSkewX = (ratioY * maxSkewX) - (maxSkewX / 2);
			const directionSkewX = coords.offsetX > centerX ? -justSkewX : justSkewX;
			const skewX = fromMinusToPlus(maxSkewX, directionSkewX * centerXRatio);
			const scaleX = minMax(minScale, maxScale, 1 - ((1 - centerXRatio) * 0.2));
			const scaleY = minMax(minScale, maxScale, 1 - ((1 - centerYRatio) * 0.2));
			this.skewElement.style.transform = `perspective(${width}px) scaleX(${scaleX}) scaleY(${scaleY}) rotateX(${degX}deg) rotateY(${degY}deg) skewX(${skewX}deg)`;
		}

		function createFallbackClick() {
			if(this.skewElementCurrentBinding.value && this.skewElementCurrentBinding.value.click) {
				window.clearTimeout && window.clearTimeout(this.fallbackAutoClick);
				const click = () => {
					this.animationEnded = false;
					this.moved = false;
					this.isDown = false;
					this.handleClick = false;
					this.clearAnimate();
					this.skewElementCurrentBinding.value.click('fallback');
				}
				if(window.setTimeout) {
					this.fallbackAutoClick = window.setTimeout(click, 450);
				} else {
					click();
				}
			}
		}

		function clearAnimate() {
			this.skewElement.style.transition = 'transform 200ms ease';
			this.skewElement.style.transform = 'none';
			if(!this.moved) {
				this.handleClick = true;
			}
		}

		function onDown(e) {
			currentContext = this;
			this.skewElementDownCoords = getCoords(e);
			window.clearTimeout && window.clearTimeout(this.fallbackAutoClick);
			this.animationEnded = false;
			this.moved = false;
			this.isDown = true;
			this.handleClick = false;
			this.skewElement = e.currentTarget;
			this.skewElementCurrentBinding = binding;
			if(!binding.modifiers.onlyClick) {
				this.skewElement.style.transition = 'transform 200ms ease';
				this.animate(e);
				e.stopPropagation();
			}
		}

		function onTransitionEnd(e) {
			if(binding.value && binding.value.click && this.handleClick && this.animationEnded) {
				window.clearTimeout && window.clearTimeout(this.fallbackAutoClick);
				binding.value.click(e);
			}
			this.animationEnded = true;
			if(!this.isDown && this.skewElement) {
				this.clearAnimate();
			}
		}

		if(binding.value && typeof binding.value.onlyClick === 'boolean') {
			binding.modifiers.onlyClick = binding.value.onlyClick;
		}

		if(
			!binding.value ||
			binding.value.initialize === undefined ||
			binding.value.initialize === true
		) {
			bindDirectiveEvents({
				elem: binding.modifiers.onlyClick ? el : null,
				bindHandlers: {
					animate,
					createFallbackClick,
					clearAnimate,
					onDown,
					onTransitionEnd
				}
			})(...arguments);
		}
	},
	unbind: unbindDirectiveEvents()
}