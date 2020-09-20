<template>
	<div
		class="cool-content"
		:class="{
			'active': active
		}"
	>
		<slot/>
	</div>
</template>


<script>
export default {
	props: {
		active: Boolean,
		withPadding: Boolean
	}
}
</script>


<style lang="stylus">
.cool-content
	opacity 0
	transition opacity 300ms ease 500ms
.cool-content&.active,
.modal-page-wrapper&.active .cool-content,
.modal-view&.active .cool-content
	opacity 1
</style>