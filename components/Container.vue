<template>
	<Div
		class="container"
		:class="[
			typeof color === 'string' && `bg-${color}`,
			color === 'white' ? 'text-black' : 'text-white',
			{
				'container-inner': inner,
				'container-styles': styled
			}
		]"
		:style="[
			typeof inner === 'string'
				? {'width': inner}
				: null,
			Array.isArray(color)
				? {'background': colorsToGradientValue(180, ...color)}
				: null
		]"
		@click="e => $emit('click', e)"
	>
		<div v-if="title" class="text-md text-bold pa-md pb-none">
			<span>{{ title }}</span>
		</div>
		<HorizontalScroll
			v-if="horizontal"
			class="full-width"
			classIn="flex"
		>
			<div class="flex pa-md">
				<slot/>
			</div>
		</HorizontalScroll>
		<slot v-else/>
	</Div>
</template>

<script>
import HorizontalScroll from '../components/HorizontalScroll.vue'
import Div from '../components/Div.vue'
import { colorsToGradientValue } from '../utils/styles.js'

export default {
	components: {
		HorizontalScroll,
		Div
	},
	props: {
		title: String,
		color: {
			type: [String,Array],
			default: 'white'
		},
		horizontal: Boolean,
		inner: [Boolean,String],
		styled: Boolean
	},
	methods: {
		colorsToGradientValue
	}
}
</script>


<style lang="stylus">
.container
	width 100%
	box-shadow 0 0 5px 1px rgba(0,0,0, 0.1)
	&.container-inner
		width 95%
		margin-left auto
		margin-right auto
	&.container-styles
		border-radius 10px
		border 1px solid #eee
		box-shadow 0 3px 5px 1px rgba(0,0,0, 0.1)
</style>