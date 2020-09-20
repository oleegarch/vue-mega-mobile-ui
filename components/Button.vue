<template>
	<div
		ref="button"
		class="button flex-center overflow-hidden"
		:class="[
			{'stretched': stretched, 'rounded': rounded, 'addShadow': addShadow},
			textColor && `text-${textColor}`,
			color && `bg-${color}`
		]"
		v-skewEffect.onlyClick="{click: () => $emit('click')}"
	>
		{{ label }}<slot/>
	</div>
</template>


<script>
import skewEffect from '../utils/skewEffectDirective.js';

export default {
	props: {
		label: String,
		stretched: Boolean,
		addShadow: Boolean,
		color: {
			type: String,
			default: 'blue'
		},
		textColor: {
			type: String,
			default: 'white'
		},
		rounded: Boolean
	},
	directives: {
		skewEffect
	}
}
</script>


<style lang="stylus">
.button
	min-height 40px
	padding 10px 40px
	font-size 16px
	border-radius 10px
	transform-origin 50% 50%
	cursor pointer
	user-select none
	&.stretched
		width 100%
	&.rounded
		border-radius 20px
	&.addShadow
		box-shadow 0 2px 5px 1px rgba(0,0,0, 0.2)
</style>