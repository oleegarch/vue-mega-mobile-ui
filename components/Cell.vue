<template>
	<div
		class="cell flex justify-between items-center"
		:class="{'skew-background-on-hover': !!clickListener}"
		v-skewEffect.onlyClick="{'initialize': !!clickListener, 'click': clickListener}"
	>
		<div class="cell-before flex justify-start items-center">
			<slot name="before"/>
			<Avatar
				:src="src"
				color="blue"
				:content="!src ? title.split(/\s|,|\-|_/).map(t => t.slice(0, titleSliceLettersLength)).join('') : null"
			/>
			<div class="cell-info column items-start justify-center">
				<div class="cell-title">
					{{ title }}
					<slot name="title"/>
				</div>
				<div class="cell-description">
					{{ description }}
					<slot name="description"/>
				</div>
				<slot name="cell-info"/>
			</div>
		</div>
		<div class="cell-after">
			<slot name="after"/>
		</div>
	</div>
</template>


<script>
import Avatar from '@/components/Avatar.vue'

import skewEffect from '@/utils/skewEffectDirective.js';

export default {
	components: {
		Avatar
	},
	props: {
		src: String,
		title: String,
		titleSliceLettersLength: {
			type: Number,
			default: 1
		},
		description: String
	},
	computed: {
		clickListener() {
			return this.$listeners && this.$listeners.click;
		}
	},
	directives: {
		skewEffect
	}
}
</script>


<style lang="stylus">
.cell
	.cell-title
		font-size 16px
		font-weight bold
	.cell-description
		font-size 13px
	.cell-before
		.avatar-wrapper
			margin-right 10px
		.cell-description
			margin-top 3px
</style>