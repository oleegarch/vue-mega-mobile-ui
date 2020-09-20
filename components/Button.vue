<template>
	<div
		ref="button"
		class="button flex-center overflow-hidden"
		:class="[
			{'stretched': stretched},
			textColor && `text-${textColor}`,
			color && `bg-${color}`
		]"
		v-skewEffect.onlyClick="{click: () => $emit('click')}"
	>
		{{ label }}<slot/>
	</div>
</template>


<script>
import skewEffect from '@/utils/skewEffectDirective.js';

export default {
	props: {
		label: String,
		stretched: Boolean,
		color: {
			type: String,
			default: 'blue'
		},
		textColor: {
			type: String,
			default: 'white'
		}
	},
	directives: {
		skewEffect
	}
}
</script>


<style lang="stylus">
.button
	height 40px
	width 100%
	padding 10px 20px
	font-size 16px
	border-radius 10px
	transform-origin 50% 50%
	cursor pointer
	user-select none
	&.stretched
		width 100%
</style>