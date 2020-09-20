<template>
	<div
		class="cool-header"
		:class="{'active': active}"
	>
		<div class="fit cool-header-content flex-center">
			<div class="cool-header-additional-content">
				<i
					v-if="$listeners.cancel"
					class="material-icons cool-header-icon cool-header-cancel"
					@click="() => $emit('cancel')"
				>cancel</i>
				<i
					v-if="$listeners.back"
					class="material-icons cool-header-icon cool-header-back"
					@click="() => $emit('back')"
				>navigate_before</i>
				<div class="cool-header-border-bottom"></div>
			</div>
			<slot/>
		</div>
	</div>
</template>


<script>
export default {
	props: {
		active: Boolean
	}
}
</script>


<style lang="stylus">
.cool-header
	position relative
	width 100%
	text-align center
	font-size 24px
	font-weight bold
	background-color #fff
	overflow hidden
	z-index 2
	> .cool-header-content
		height 60px
		min-height 60px
		transform translateX(-100%)
		transition transform 500ms ease 100ms
		> .cool-header-additional-content
			position absolute
			top 0
			left 0
			width 100%
			height 100%
			> .cool-header-border-bottom
				position absolute
				bottom 0
				left 0
				height 1px
				width 100%
				background-color #eee
	.cool-header-icon
		position absolute
		top 50%
		transform translateY(-50%) scale(0)
		font-size 30px
		transition transform 300ms ease 500ms
		cursor pointer
		user-select none
		z-index 3
	.cool-header-cancel
		right 15px
		color rgba(0,0,0, 0.2)
	.cool-header-back
		left 15px
		font-size 40px
		color rgba(0,0,0, 0.4)
.modal-view
	.cool-header-content
		transform translateX(100%)
.cool-header&.active,
.modal-page-wrapper&.active,
.modal-view&.active
	.cool-header-content
		transform translateX(0)
	.cool-header-icon
		transform translateY(-50%) scale(1)
</style>