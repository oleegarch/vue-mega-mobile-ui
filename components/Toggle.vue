<template>
	<div
		class="toggle-container"
		:class="{'checked': active}"
		@click="toggle"
	>
		<div class="toggle-circle-container">
			<div class="toggle-circle-shadow" :class="'bg-' + (active ? color : 'grey-5')"></div>
			<div
				class="toggle-circle flex-center"
				:class="['bg-' + color, 'text-' + textColor]"
			></div>
		</div>
		<div class="toggle-track" :class="'bg-' + (active ? color : 'grey-5')"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: !!this.value
		}
	},
	props: {
		value: {
			type: Boolean,
			default: true
		},
		color: {
			type: String,
			default: 'blue'
		},
		textColor: {
			type: String,
			default: 'white'
		}
	},
	watch: {
		value(v) {
			this.active = v;
		},
		active(v) {
			this.$emit('input', v);
		}
	},
	methods: {
		toggle() {
			this.active = !this.active;
		}
	}
}
</script>

<style lang="stylus">
.toggle-container
	position relative
	cursor pointer
	margin 6px 10px
	> .toggle-circle-container
		position absolute
		top 50%
		left 100%
		transform translate(-50%, -50%)
		transition left 300ms ease
		> .toggle-circle
			position relative
			height 20px
			width 20px
			border-radius 50%
			z-index 2
		> .toggle-circle-shadow
			position absolute
			top 50%
			left 50%
			transform translate(-50%, -50%)
			height 20px
			width 20px
			transition 300ms linear
			opacity 0.5
			border-radius 50%
			z-index 1
	> .toggle-track
		width 35px
		height 8px
		border-radius 4px
	&:hover
		.toggle-circle-shadow
			transform translate(-50%, -50%) scale(2)
	&:not(.checked)
		> .toggle-circle-container
			left 0
			transform translate(-50%, -50%)
			.toggle-circle
				background-color #bdbdbd !important
				background-color var(--grey-5) !important
</style>