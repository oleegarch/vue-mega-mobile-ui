<template>
	<div
		class="row items-center radio-container"
		:class="`justify-${justify}`"
	>
		<div v-if="leftLabel" class="mr-xs" @click="toggle">
			<span>{{ leftLabel }}</span>
		</div>
		<div
			class="radio-block"
			:class="{'checked': active}"
			@click="enable"
		>
			<div class="radio-circle" :class="'bg-' + (active ? color : 'grey-5')"></div>
			<div
				class="radio flex-center"
				:class="['bg-' + color, 'text-' + textColor]"
			>
				<div class="radio-active-circle"></div>
			</div>
		</div>
		<div v-if="label" class="ml-xs" @click="enable">
			<span>{{ label }}</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: !!this.value
		}
	},
	props: {
		value: {
			type: Boolean,
			default: true
		},
		color: {
			type: String,
			default: 'blue'
		},
		textColor: {
			type: String,
			default: 'white'
		},
		label: {
			type: String
		},
		leftLabel: {
			type: String
		},
		justify: {
			type: String
		}
	},
	watch: {
		value(v) {
			this.active = v;
		}
	},
	methods: {
		enable() {
			this.active = true;
			this.$emit('input', this.active);
		}
	}
}
</script>

<style lang="stylus">
.radio-block
	position relative
	cursor pointer
	.radio
		position relative
		height 20px
		width 20px
		border-radius 50%
		z-index 2
		> .radio-active-circle
			height 15px
			width 15px
			border 4px solid #fff
			border-radius 7.5px
	> .radio-circle
		position absolute
		top 50%
		left 50%
		transform translate(-50%, -50%)
		height 20px
		width 20px
		transition 200ms linear
		opacity 1
		border-radius 50%
		z-index 1
	&:hover
		> .radio-circle
			transform translate(-50%, -50%) scale(2)
			opacity 0.1
	&:not(.checked)
		.radio
			background-color #fff !important
			background-color currentColor !important
			border 3px solid #bdbdbd
			border 3px solid var(--grey-5)
			> *
				display none
</style>