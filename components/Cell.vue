<template>
	<a
		:href="link"
		target="_blank"
		class="cell justify-between items-center"
		:class="[reverse ? 'row-reverse' : 'row', {'skew-background-on-hover': hasClickListener, 'pa-xs': hasClickListener}]"
		v-skewEffect.onlyClick="{'initialize': hasClickListener, 'click': clickListener}"
	>
		<div class="cell-before justify-start items-center" :class="reverse ? 'row-reverse' : 'row'">
			<slot name="before"/>
			<a
				class="flex"
				:href="href"
				target="_blank"
			>
				<Avatar
					:src="src"
					:size="avatarSize"
					:title="title"
					:class="reverse ? 'ml-sm' : 'mr-sm'"
				/>
			</a>
			<div class="cell-info column items-start justify-center">
				<a
					v-if="title || $slots.title"
					:href="href"
					target="_blank"
					class="cell-title"
				>
					{{ title }}
					<slot name="title"/>
				</a>
				<div v-if="description || $slots.description" class="cell-description">
					{{ description }}
					<slot name="description"/>
				</div>
				<slot name="cell-info"/>
			</div>
		</div>
		<div v-if="$slots.after" class="cell-after">
			<slot name="after"/>
		</div>
	</a>
</template>


<script>
import Avatar from '../components/Avatar.vue'

import skewEffect from '../utils/skewEffectDirective.js';

export default {
	components: {
		Avatar
	},
	props: {
		link: String,
		href: String,
		src: String,
		title: String,
		description: String,
		avatarSize: [String,Number],
		reverse: Boolean
	},
	computed: {
		hasClickListener() {
			return this.link || !!(this.$listeners && this.$listeners.click);
		},
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
		.cell-description
			margin-top 3px
</style>