<template>
	<div
		class="icon-block flex-center"
		:class="[color && `bg-${color}`, iconColor && `text-${iconColor}`]"
		:style="{
			'width': size + 'px',
			'height': size + 'px'
		}"
	>
		<i class="material-icons" :style="{'font-size': iconSize + 'px'}">{{ icon }}<slot/></i>
	</div>
</template>

<script>
export default {
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