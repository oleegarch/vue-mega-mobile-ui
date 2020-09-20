<template>
	<div
		class="avatar-wrapper flex-center text-white text-lg font-numbers"
		:style="{
			'background-color': 'var(--' + color + ')',
			'width': size + 'px',
			'min-width': size + 'px',
			'height': size + 'px'
		}"
	>
		<img
			v-if="src"
			class="avatar bg-grey-6"
			:src="src"
			:alt="alt || 'avatar'"
		>
		<div v-if="content" v-html="content" :style="{'fontSize': (content.length >= 4 ? 15 : 20) + 'px'}"></div>
		<slot/>
	</div>
</template>


<script>
export default {
	props: {
		size: {
			type: Number,
			default: 50
		},
		color: {
			type: String,
			default: 'grey'
		},
		content: String,
		src: String,
		alt: String
	}
}
</script>


<style lang="stylus">
.avatar-wrapper
	border-radius 50%
	overflow hidden
</style>