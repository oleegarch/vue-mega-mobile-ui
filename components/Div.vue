<template>
	<div class="div" :class="{'with-padding': withPadding}">
		<slot/>
	</div>
</template>


<script>
export default {
	props: {
		withPadding: Boolean
	}
}
</script>


<style lang="stylus">
.div
	&.with-padding
		padding 20px
</style>