<template>
	<i
		class="material-icons"
		:class="color && `text-${color}`"
		@click="(e) => $emit('click', e)"
	>
		{{ name }}
		<slot/>
	</i>
</template>

<script>
export default {
	props: {
		name: String,
		color: String
	}
}
</script>