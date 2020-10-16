<template>
	<div class="horizontal-scroll">
		<div class="horizontal-scroll-in" :class="classIn">
			<slot/>
		</div>
	</div>
</template>


<script>
export default {
	props: {
		classIn: [String,Number,Array,Object]
	}
}
</script>


<style lang="stylus">
.horizontal-scroll
	position relative
	overflow hidden
	&-in
		overflow-x auto
		-webkit-overflow-scrolling touch
		padding-bottom 20px
		margin-bottom -20px
</style>