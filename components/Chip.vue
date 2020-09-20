<template>
	<div
		class="chip flex py-sm px-lg text-white text-sm text-bold"
		:class="color ? 'bg-' + color : null"
		style="border-radius: 25px;"
		:style="gradient && {'background': gradient}"
	>
		<slot/>
	</div>
</template>


<script>
export default {
	props: {
		color: String,
		gradient: String
	}
}
</script>


<style lang="stylus">
.chip	{

}
</style>