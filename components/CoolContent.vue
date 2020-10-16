<template>
	<div
		class="cool-content"
		:class="{
			'active': active,
			'pa-md': withPadding
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
$transition = opacity 300ms ease
.cool-content
	opacity 0
	transition $transition 500ms
.cool-content&.active,
.modal-page-wrapper&.active .cool-content,
.modal-view&.active .cool-content,
.modal-dialog-wrapper&.active .cool-content
	opacity 1
.modal-dialog-wrapper .cool-content
	transition $transition 1000ms
</style>