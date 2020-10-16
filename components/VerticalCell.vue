<template>
	<div
		class="vertical-cell column items-center justify-start"
		:class="{'skew-background-on-hover': hasClickListener, 'pa-xs': hasClickListener}"
		v-skewEffect.onlyClick="{'initialize': hasClickListener, 'click': clickListener}"
	>
		<Avatar v-if="src" :src="src" :size="avatarSize"/>
		<div class="vertical-cell-title">
			{{ title }}
			<slot name="title"/>
		</div>
		<div class="vertical-cell-description">
			{{ description }}
			<slot name="description"/>
		</div>
	</div>
</template>


<script>
import skewEffectDirective from '../utils/skewEffectDirective.js'
import Avatar from '../components/Avatar.vue'

export default {
	components: {
		Avatar
	},
	props: {
		src: String,
		title: String,
		description: String,
		avatarSize: [String,Number]
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
		skewEffect: skewEffectDirective
	}
}
</script>


<style lang="stylus">
.vertical-cell
	.vertical-cell-title
		font-size 16px
		font-weight bold
</style>