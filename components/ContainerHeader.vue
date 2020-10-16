<template>
	<div class="row justify-between items-center pa-md pb-none">
		<div class="flex text-md text-bold mr-xs">
			<span v-if="title">{{ title }}</span>
			<slot/>
		</div>
		<div class="flex text-no-wrap text-sm text-grey-6">
			<span v-if="after">{{ after }}</span>
			<slot name="after"/>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: String,
		after: String
	}
}
</script>