<template>
	<div
		class="cool-header"
		:class="{'active': active}"
		:style="noBackground ? {'backgroundColor': 'transparent'} : null"
	>
		<div class="fit cool-header-content flex-center">
			<div class="cool-header-additional-content">
				<Icon
					v-if="$listeners.cancel"
					name="cancel"
					class="cool-header-icon cool-header-cancel"
					@click="() => $emit('cancel')"
				/>
				<Icon
					v-if="$listeners.back"
					name="navigate_before"
					class="cool-header-icon cool-header-back"
					@click="() => $emit('back')"
				/>
				<div v-if="!noHr" class="cool-header-border-bottom"></div>
			</div>
			<slot/>
		</div>
	</div>
</template>


<script>
export default {
	props: {
		active: Boolean,
		noHr: Boolean,
		noBackground: Boolean
	}
}
</script>


<style lang="stylus">
$contentTransition = transform 500ms ease
$iconTransition = transform 300ms ease
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
		transition $contentTransition 100ms
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
		transition $iconTransition 500ms
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
.modal-view&.active,
.modal-dialog-wrapper&.active
	.cool-header-content
		transform translateX(0)
	.cool-header-icon
		transform translateY(-50%) scale(1)
.modal-dialog-wrapper
	.cool-header-content
		transition $contentTransition 600ms
	.cool-header-icon
		transition $iconTransition 1000ms
</style>