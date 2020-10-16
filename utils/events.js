import detectIt from 'detect-it';

export const hasTouch = detectIt.hasTouch;

export function getTouch(event) {
	if(event.targetTouches && event.targetTouches[0]) {
		return event.targetTouches[0];
	}
	if(event.changedTouches && event.changedTouches[0]) {
		return event.changedTouches[0];
	}
	if(event.touches && event.touches[0]) {
		return event.touches[0];
	}
	return event;
}

export function getCoords(event, element) {
	const touch = getTouch(event);
	const result = {
		x: touch.clientX,
		y: touch.clientY
	};
	if(element) {
		const coords = element.getBoundingClientRect();
		result.offsetX = touch.clientX - coords.left;
		result.offsetY = touch.clientY - coords.top;	
	}
	return result;
}

function getBindedEventsByElem(events, elem, isEqual = true) {
	return events.filter(([bindedElem, args, bindedForElem]) => isEqual ? bindedForElem === elem : bindedForElem !== elem);
}

const defaultEventOptions = {capture: false, passive: true};
const getEventOptions = opts => (
	detectIt.passiveEvents === true
		? typeof opts === 'object' && opts !== null
			? Object.assign({}, defaultEventOptions, opts)
			: opts
		: false
);

export function bindEvents(handlers = [], options = {}) {
	const opts = getEventOptions(options.eventOptions);
	let bindedEvents = [];
	handlers.forEach(([event, handler]) => {
		if(handler) {
			switch(event) {
				case 'onTransitionEnd':
					bindedEvents.push([options.bindElem || options.bindForElem, ['transitionend', handler, opts], options.bindForElem]);
					break;
				case 'onDown':
					bindedEvents.push([options.bindElem || options.bindForElem, [hasTouch ? 'touchstart' : 'mousedown', handler, opts], options.bindForElem]);
					break;
				case 'onUp':
					if(hasTouch) {
						bindedEvents.push([options.bindElem || window, ['touchend', handler, opts], options.bindForElem]);
						bindedEvents.push([options.bindElem || window, ['touchcancel', handler, opts], options.bindForElem]);
					} else {
						bindedEvents.push([options.bindElem || window, ['mouseup', handler, opts], options.bindForElem]);
					}
					break;
				case 'onMove':
					bindedEvents.push([options.bindElem || window, [hasTouch ? 'touchmove' : 'mousemove', handler, opts], options.bindForElem]);
					break;
			}
		}
	})
	bindedEvents.forEach(([bindedElem, args, bindedForElem]) => bindedElem.addEventListener(...args));
	return bindedEvents;
}

export function bindDirectiveEvents(options = {}) {
	return (el, binding, vnode) => {
		const vm = vnode.context;
		if(options.bindHandlers) {
			for(const key in options.bindHandlers) {
				vm[key] = options.bindHandlers[key].bind(vm);
			}
		}
		vm.bindedEvents = vm.bindedEvents || [];
		const handlerNames = ['onTransitionEnd', 'onDown', 'onUp', 'onMove'];
		const events = bindEvents(handlerNames.map(h => [h, options[h] || vm[h]]), {
			bindElem: options.elem ? options.elem === 'root' ? el : options.elem : null,
			bindForElem: el,
			eventOptions: options.eventOptions
		});
		vm.bindedEvents.push(...events);
	}
}

export function unbindDirectiveEvents(options = {}) {
	return (el, binding, vnode) => {
		const vm = vnode.context;
		if(vm.bindedEvents) {
			getBindedEventsByElem(vm.bindedEvents, el, true).forEach(([bindedElem, args]) => bindedElem.removeEventListener(...args));
			vm.bindedEvents = getBindedEventsByElem(vm.bindedEvents, el, false);	
		}
	}
}