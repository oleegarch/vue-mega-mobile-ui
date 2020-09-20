<template>
	<div class="vertical-cell column items-center justify-start">
		<Avatar v-if="src" :src="src"/>
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
import Avatar from '../components/Avatar.vue'

export default {
	components: {
		Avatar
	},
	props: {
		src: String,
		title: String,
		description: String
	}
}
</script>


<style lang="stylus">
.vertical-cell
	.vertical-cell-title
		font-size 16px
		font-weight bold
</style>