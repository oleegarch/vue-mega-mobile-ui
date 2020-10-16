<template>
	<div
		class="progress"
		:class="`bg-${emptyColor}`"
		:style="{'height': size + 'px'}"
	>
		<div
			class="progress-percent"
			:class="`bg-${color}`"
			:style="{'width': percent + '%'}"
		/>
	</div>
</template>

<script>
export default {
	props: {
		size: {
			type: Number,
			default: 3
		},
		color: String,
		emptyColor: String,
		percent: Number
	}
}
</script>

<style lang="stylus">
.progress
	position relative
	z-index 1
	height 3px
	width 100%
	background-color #eee
	background-color var(--grey-2)
	> .progress-percent
		position absolute
		top 0
		left 0
		z-index 2
		height 100%
		width 50%
		background-color #38A28A
		background-color var(--blue-6)
</style>