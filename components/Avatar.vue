<template>
	<div
		class="avatar-wrapper flex-center text-white text-lg font-numbers"
		:style="{
			'background-color': `var(--${colorLight})`,
			'background': colorsToGradientValue(45, colorLight, colorDarkness),
			'width': typeof size === 'number' ? (size + 'px') : size,
			'min-width': typeof size === 'number' ? (size + 'px') : size,
			'height': typeof size === 'number' ? (size + 'px') : size
		}"
	>
		<img
			v-if="src"
			class="avatar bg-grey-6"
			:src="src"
			:alt="alt || 'avatar'"
		>
		<div v-if="letters" v-html="letters" :style="{'fontSize': (letters.length >= 4 ? 15 : 20) + 'px'}"></div>
		<slot/>
	</div>
</template>


<script>
import { getRandomColor, getColorByText, colorsToGradientValue, changeColor } from '../utils/styles.js'
export default {
	props: {
		size: {
			type: [String,Number],
			default: 50
		},
		color: {
			type: String,
			default: 'auto'
		},
		letter: String,
		title: String,
		titleSliceLettersLength: {
			type: Number,
			default: 1
		},
		src: String,
		alt: String
	},
	computed: {
		letters() {
			return !this.src ? (this.letter || (this.title && this.title.split(/\s|,|\-|_/).map(t => t.slice(0, this.titleSliceLettersLength)).join(''))) : null;
		},
		colorLight() {
			let result;
			if(this.color === 'auto') {
				if(this.title) {
					result = getColorByText(this.title);
				} else {
					result = getRandomColor();
				}
			}
			if(!result) {
				result = this.color;
			}
			return result;
		},
		colorDarkness() {
			return changeColor(this.colorLight, +2);
		}
	},
	methods: {
		colorsToGradientValue
	}
}
</script>


<style lang="stylus">
.avatar-wrapper
	border-radius 50%
	overflow hidden
</style>