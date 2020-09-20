<template>
	<Div
		class="container bg-white"
		:class="{'container-inner container-styles': inner}"
		:style="typeof inner === 'string' ? {'width': inner} : null"
	>
		<HorizontalScroll
			v-if="horizontal"
			class="full-width"
			classIn="flex"
		>
			<div class="flex pa-md">
				<slot/>
			</div>
		</HorizontalScroll>
		<slot v-else/>
	</Div>
</template>

<script>
import HorizontalScroll from '@/components/HorizontalScroll.vue'
import Div from '@/components/Div.vue'

export default {
	components: {
		HorizontalScroll,
		Div
	},
	props: {
		horizontal: Boolean,
		inner: [Boolean,String]
	}
}
</script>


<style lang="stylus">
.container
	width 100%
	box-shadow 0 0 5px 1px rgba(0,0,0, 0.1)
.container-inner
	width 95%
	margin 0 auto
.container-styles
	border-radius 10px
	border 1px solid #eee
	box-shadow 0 3px 5px 1px rgba(0,0,0, 0.1)
</style>