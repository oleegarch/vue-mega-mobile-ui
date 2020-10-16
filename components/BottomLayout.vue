<template>
	<div id="bottom-layout" class="padding-bottom-safe-area">
		<div class="bottom-layout-tabs flex justify-center items-stretch full-height">
			<div
				v-for="tab in tabs"
				:key="tab.name"
				class="bottom-layout-tab skew-background-on-hover skew-background-on-hover-without-border"
				v-skewEffect.onlyClick="{'initialize': !!tab.click, 'click': tab.click}"
			>
				<div class="bottom-layout-tab-content">
					<i class="material-icons" :style="{'fontSize': typeof iconSize === 'number' ? iconSize + 'px' : iconSize}">{{ tab.icon }}</i>
					<span :style="{'fontSize': typeof textSize === 'number' ? textSize + 'px' : textSize}">{{ tab.label }}</span>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
import skewEffect from '../utils/skewEffectDirective.js';

export default {
	props: {
		tabs: Array,
		iconSize: [String,Number],
		textSize: [String,Number]
	},
	directives: {
		skewEffect
	}
}
</script>


<style lang="stylus">
#bottom-layout
	position fixed
	bottom 0
	left 0
	width 100%
	min-height 60px
	height 60px
	height calc(60px + var(--safe-area-inset-bottom))
	background-color #fff
	border-top 1px solid #eee
	box-shadow 0 -3px 8px 3px rgba(0,0,0,0.1)
	z-index 900
.bottom-layout-tabs
	max-width 600px
	margin 0 auto
	> .bottom-layout-tab
		position relative
		display flex
		flex-shrink 0
		flex-grow 1
		flex-basis 0
		align-items center
		justify-content center
		height 100%
		width 100%
		max-width 100%
		padding 0 10px
		cursor pointer
		user-select none
		> .bottom-layout-tab-content
			display flex
			flex-direction column
			align-items center
			justify-content center
			align-self center
			> i
				color var(--blue-9)
				font-size 28px
			> span
				color #222
				font-size 13px
</style>