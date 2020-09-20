<template>
	<div class="grid flex justify-around wrap" :class="{'with-padding': withPadding}">
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
.grid
	> *
		width 33%
		width calc(33% - 10px)
		margin 5px
	&.with-padding
		padding 20px
</style>