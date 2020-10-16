<template>
	<div
		class="div"
		:class="{'pa-md': withPadding}"
		@click="e => $emit('click', e)"
	>
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