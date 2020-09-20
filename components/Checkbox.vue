<template>
	<div
		class="checkbox-container"
		:class="{'checked': active}"
		@click="toggle"
	>
		<div class="checkbox-circle" :class="'bg-' + (active ? color : 'grey-5')"></div>
		<div
			class="checkbox flex-center"
			:class="['bg-' + color, 'text-' + textColor]"
		>
			<i class="material-icons">check</i>
		</div>
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
.checkbox-container
	position relative
	cursor pointer
	.checkbox
		position relative
		height 20px
		width 20px
		border-radius 2px
		z-index 2
		> i
			font-size 20px
	> .checkbox-circle
		position absolute
		top 50%
		left 50%
		transform translate(-50%, -50%)
		height 20px
		width 20px
		transition 200ms linear
		opacity 0.5
		border-radius 50%
		z-index 1
	&:hover
		> .checkbox-circle
			transform translate(-50%, -50%) scale(2)
	&:not(.checked)
		> .checkbox
			background-color #fff !important
			background-color currentColor !important
			border 3px solid #bdbdbd
			border 3px solid var(--grey-5)
			> *
				display none
</style>