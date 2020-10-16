<template>
	<div
		class="modal-dialog-wrapper"
		:class="{'active': value}"
	>
		<div
			class="modal-dialog-mask" 
			:style="{'zIndex': 3000 + Number(zIndex)}"
			@click="closeFire"
		/>
		<div
			v-moving
			class="modal-dialog"
			ref="modalDialog"
			:style="{'zIndex': 3001 + Number(zIndex)}"
		>
			<div class="modal-dialog-header flex-center">
				<slot name="header"/>
			</div>
			<div
				class="modal-dialog-content"
				:style="{'paddingTop': $slots.header ? headerPadding || '60px' : 0}"
				ref="content"
			>
				<slot/>
			</div>
		</div>
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
		type: String,
		value: Boolean,
		headerPadding: [String,Number],
		zIndex: [String,Number]
	},
	watch: {
		value(v) {
			if(v) {
				window.clearTimeout(this.onCloseAnimationEndedTimeout);
			} else {
				this.animateionCloseFire();
			}
		}
	},
	methods: {
		canDrag(e) {
			return this.moving;
		},
		onDown(e) {
			const coords = getTouch(e);
			this.moving = true;
			this.startCoords = {x: coords.clientX, y: coords.clientY};
		},
		onMove(e) {
			if(this.canDrag(e)) {
				const coords = getTouch(e);
				const shiftX = this.currentShiftX = (coords.clientX - this.startCoords.x) / 2;
				const shiftY = this.currentShiftY = (coords.clientY - this.startCoords.y) / 2;
				this.$refs.modalDialog.style.transition = 'none';
				this.$refs.modalDialog.style.transform = `translate(calc(-50% + ${shiftX}px), calc(-50% + ${shiftY}px))`;
			}
		},
		onUp(e) {
			if(this.canDrag(e) && (Math.abs(this.currentShiftX) > 20 || Math.abs(this.currentShiftY) > 20)) {
				this.closeFire();
			}
			removeStyles(this.$refs.modalDialog, ['transition', 'transform']);
			this.moving = false;
			this.currentShiftX = 0;
			this.currentShiftY = 0;
		},
		closeFire() {
			this.$emit('input', false);
			this.$emit('onClose');
			this.animateionCloseFire();
		},
		animateionCloseFire(cb) {
			const callback = () => {
				if(cb) cb();
				this.$emit('onCloseAnimationEnded');
			}
			if(this.$listeners && this.$listeners.onCloseAnimationEnded) {
				if(!window.setTimeout)
					return callback();
				window.clearTimeout(this.onCloseAnimationEndedTimeout);
				this.onCloseAnimationEndedTimeout = window.setTimeout(() => callback(), 500);
			}
		}
	},
	directives: {
		moving: {
			bind: bindDirectiveEvents(),
			unbind: unbindDirectiveEvents()
		}
	}
}
</script>


<style lang="stylus">
$dialogTransition = transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1)
.modal-dialog-wrapper
	position relative
	.modal-dialog-mask
		position fixed
		top 50%
		left 50%
		transform translate(-50%, -50%) scale(0)
		width 200vh
		height 200vh
		transition transform 500ms ease-in-out
		background-color rgba(0,0,0, 0.2)
		border-radius 50%
		z-index 3000
	.modal-dialog
		position fixed
		top 50%
		left 50%
		width 90%
		max-width 600px
		height auto
		min-height 100px
		max-height 80%
		max-height calc(100% - 100px)
		max-height calc(100% - 100px - var(--safe-area-inset-top))
		border-radius 20px
		transform translate(-50%, -50%) scale(0)
		transition $dialogTransition 0ms
		background-color #fff
		box-shadow 0 -3px 8px 3px rgba(0,0,0,0.1)
		overflow hidden
		user-select none
		z-index 3001
		.modal-dialog-header
			position absolute
			top 0
			left 0
			height 60px
			max-height 60px
			width 100%
		.modal-dialog-content
			height auto
			max-height calc(100vh - 100px)
			max-height calc(100vh - 100px - var(--safe-area-inset-top))
			padding-top 60px
			overflow hidden
	&.active
		.modal-dialog-mask
			transform translate(-50%, -50%) scale(1)
		.modal-dialog
			transform translate(-50%, -50%) scale(1)
			transition $dialogTransition 500ms
</style>