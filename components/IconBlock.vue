<template>
	<div
		class="icon-block flex-center"
		:class="[color && `bg-${color}`, iconColor && `text-${iconColor}`]"
		:style="{
			'width': size + 'px',
			'height': size + 'px'
		}"
	>
		<Icon :name="icon" :style="{'font-size': iconSize + 'px'}"/>
	</div>
</template>

<script>
import Icon from './Icon.vue'
export default {
	components: {
		Icon
	},
	props: {
		size: {
			type: Number,
			default: 36
		},
		iconSize: {
			type: Number,
			default() {
				return this.size * 0.6;
			}
		},
		icon: String,
		color: {
			type: String,
			default: 'grey'
		},
		iconColor: {
			type: String,
			default: 'white'
		}
	}
}
</script>


<style lang="stylus">
.icon-block
	border-radius 50%
</style>