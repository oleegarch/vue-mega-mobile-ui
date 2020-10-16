<template>
	<div
		ref="button"
		class="button flex-center text-center text-no-wrap overflow-hidden"
		:class="[
			{'stretched': stretched, 'rounded': rounded, 'addShadow': addShadow},
			textColor && `text-${textColor}`,
			size && `size-${size}`,
			typeof color === 'string' && `bg-${color}`
		]"
		:style="{'background':
			Array.isArray(color)
				? colorsToGradientValue(160, color)
				: addDarknessGradient
					? colorsToGradientValue(160, color, changeColor(color, +2))
					: null
		}"
		v-skewEffect.onlyClick="{click: () => $emit('click')}"
	>
		{{ label }}<slot/>
	</div>
</template>


<script>
import { changeColor, colorsToGradientValue } from '../utils/styles.js'
import skewEffect from '../utils/skewEffectDirective.js';

export default {
	props: {
		label: String,
		stretched: Boolean,
		addShadow: Boolean,
		color: {
			type: [String,Array],
			default: 'blue'
		},
		addDarknessGradient: {
			type: Boolean,
			default: true
		},
		textColor: {
			type: String,
			default() {
				return this.color === 'white' ? 'black' : 'white';
			}
		},
		rounded: Boolean,
		size: {
			type: String,
			enum: ['xs', 'sm', 'md', 'lg', 'xl'],
			default: 'md'
		}
	},
	directives: {
		skewEffect
	},
	methods: {
		colorsToGradientValue,
		changeColor
	}
}
</script>


<style lang="stylus">
.button
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
	&.size-xs
		padding 8px 20px
		font-size 12px
		&.rounded
			border-radius 15px
	&.size-sm
		padding 8px 30px
		font-size 14px
		&.rounded
			border-radius 17px
	&.size-md
		font-size 16px
		&.rounded
			border-radius 20px
	&.size-lg
		font-size 20px
		border-radius 12px
		&.rounded
			border-radius 22px
	&.size-xl
		font-size 24px
		border-radius 14px
		&.rounded
			border-radius 24px
</style>