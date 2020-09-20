<template>
	<div
		v-moving
		ref="modalView"
		class="modal-view padding-bottom-safe-area"
		:class="{'active': active}"
	>
		<slot/>
	</div>
</template>


<script>
import { getTouch, bindDirectiveEvents, unbindDirectiveEvents } from '../utils/events.js';
import { removeStyles } from '../utils/styles.js'

export default {
	data() {
		return {
			moving: false
		}
	},
	props: {
		active: Boolean
	},
	methods: {
		canDrag(e) {
			const coords = getTouch(e);
			return (
				this.moving &&
				coords.clientX > this.startCoords.x &&
				this.direction === 'x'
			);
		},
		onDown(e) {
			const coords = getTouch(e);
			this.moving = true;
			this.startCoords = {x: coords.clientX, y: coords.clientY};
		},
		onMove(e) {
			const coords = getTouch(e);
			if(this.canDrag(e)) {
				const shiftX = this.currentShiftX = (coords.clientX - this.startCoords.x) / 2;
				this.$refs.modalView.style.transition = 'none';
				this.$refs.modalView.style.transform = `translateX(${shiftX}px)`;
				e.preventDefault();
			}
			if(!this.direction && this.startCoords !== undefined) {
				const shiftX = coords.clientX - this.startCoords.x;
				const shiftY = coords.clientY - this.startCoords.y;
				this.direction = Math.abs(shiftY) > 20 ? 'y' : Math.abs(shiftX) > 20 ? 'x' : null;
			}
		},
		onUp(e) {
			if(this.canDrag(e) && Math.abs(this.currentShiftX) > 20) {
				this.$emit('onClose');
			}
			removeStyles(this.$refs.modalView, ['transition', 'transform']);
			this.moving = false;
			this.direction = null;
		},
	},
	directives: {
		moving: {
			bind: bindDirectiveEvents({eventOptions: {passive: false, cancelable: true}}),
			unbind: unbindDirectiveEvents()
		}
	}
}
</script>



<style lang="stylus">
.modal-view
	position fixed
	top 0
	left 0
	transform translateX(100%)
	transition transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1)
	background-color #fff
	width 100%
	height 100%
	overflow auto
	z-index 1000
	.cool-header
		position sticky
		top 0
		left 0
		padding-top var(--safe-area-inset-top)
	&.active
		transform translateX(0)
</style>