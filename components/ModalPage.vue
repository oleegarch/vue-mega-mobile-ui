<template>
	<div
		class="modal-page-wrapper"
		:class="{'active': active, 'modal-page-card-type': type === 'card'}"
	>
		<div
			class="modal-mask"
			@click="closeFire"
		></div>
		<div
			v-moving
			ref="modalPage"
			class="modal-page"
		>
			<div class="modal-page-header flex-center">
				<slot name="header"/>
			</div>
			<div
				class="modal-page-content"
				:class="{'padding-bottom-safe-area': type !== 'card'}"
				ref="content"
			>
				<slot/>
			</div>
		</div>
	</div>
</template>


<script>
import { getTouch, bindDirectiveEvents, unbindDirectiveEvents } from '@/utils/events.js';
import { removeStyles } from '@/utils/styles.js'

export default {
	data() {
		return {
			moving: false
		}
	},
	props: {
		type: String,
		active: Boolean
	},
	watch: {
		active(v) {
			if(v) {
				window.clearTimeout(this.onCloseAnimationEndedTimeout);
			} else {
				this.animateionCloseFire();
			}
		}
	},
	methods: {
		canDrag(e) {
			const coords = getTouch(e);
			return (
				this.moving &&
				coords.clientY > this.startCoords.y &&
				this.$refs.content.scrollTop === 0
			);
		},
		onDown(e) {
			const coords = getTouch(e);
			this.moving = this.$refs.content.scrollTop === 0;
			this.startCoords = {x: coords.clientX, y: coords.clientY};
		},
		onMove(e) {
			const coords = getTouch(e);
			if(this.canDrag(e)) {
				const shiftY = this.currentShiftY = (coords.clientY - this.startCoords.y) / 2;
				this.$refs.modalPage.style.transition = 'none';
				this.$refs.modalPage.style.transform = `translate(-50%, ${shiftY}px)`;
			}
		},
		onUp(e) {
			if(this.canDrag(e) && Math.abs(this.currentShiftY) > 20) {
				this.closeFire();
			}
			removeStyles(this.$refs.modalPage, ['transition', 'transform']);
			this.moving = false;
		},
		closeFire() {
			this.$emit('onClose');
			this.animateionCloseFire();
		},
		animateionCloseFire() {
			if(this.$listeners && this.$listeners.onCloseAnimationEnded) {
				if(!window.setTimeout) {
					return this.$emit('onCloseAnimationEnded');
				}
				window.clearTimeout(this.onCloseAnimationEndedTimeout);
				this.onCloseAnimationEndedTimeout = window.setTimeout(() => {
					this.$emit('onCloseAnimationEnded');
				}, 500)
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
.modal-page-wrapper
	position relative
	.modal-mask
		position fixed
		top 50%
		left 50%
		transform translate(-50%, -50%) scale(0)
		width 200vh
		height 200vh
		transition transform 500ms ease-in-out
		background-color rgba(0,0,0, 0.2)
		border-radius 50%
		z-index 2000
	.modal-page
		position fixed
		bottom 0
		left 50%
		width 100%
		max-width 600px
		height auto
		min-height 100px
		max-height 80%
		max-height calc(100% - 100px)
		max-height calc(100% - 100px - var(--safe-area-inset-top))
		border-top-left-radius 20px
		border-top-right-radius 20px
		transform translate(-50%, 150%)
		transition transform 500ms cubic-bezier(0.36, 0.66, 0.04, 1)
		background-color #fff
		box-shadow 0 -3px 8px 3px rgba(0,0,0,0.1)
		overflow hidden
		user-select none
		z-index 2001
		.modal-page-header
			position absolute
			top 0
			left 0
			height 60px
			max-height 60px
			width 100%
		.modal-page-content
			height auto
			max-height calc(100vh - 100px)
			max-height calc(100vh - 100px - var(--safe-area-inset-top))
			padding-top 60px
			overflow auto
	&.active
		.modal-mask
			transform translate(-50%, -50%) scale(1)
		.modal-page
			transform translate(-50%, 0)
	&.modal-page-card-type
		.modal-page
			width 90vw
			border-radius 20px
			margin-bottom 5vw
			margin-bottom calc(5vw + var(--safe-area-inset-bottom))
</style>