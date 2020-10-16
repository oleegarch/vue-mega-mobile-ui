<template>
	<div
		class="row items-center checkbox-container"
		:class="`justify-${justify}`"
	>
		<div v-if="leftLabel" class="mr-xs" @click="toggle">
			<span>{{ leftLabel }}</span>
		</div>
		<div
			class="checkbox-block"
			:class="{'checked': active}"
			@click="toggle"
		>
			<div class="checkbox-circle" :class="'bg-' + (active ? color : 'grey-5')"></div>
			<div
				class="checkbox flex-center"
				:class="['bg-' + color, 'text-' + textColor]"
			>
				<i class="material-icons">check</i>
			</div>
		</div>
		<div v-if="label" class="ml-xs" @click="toggle">
			<span>{{ label }}</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: this.isValueArray() ? this.value.indexOf(this.name) > -1 : !!this.value
		}
	},
	props: {
		value: {
			type: [Array,Boolean],
			default: true
		},
		name: {
			type: String
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
			if(this.isValueArray()) {
				this.active = v.indexOf(this.name) > -1;
			} else {
				this.active = v;
			}
		},
		active(v) {
			if(this.isValueArray()) {
				let result = this.value.slice(0).filter(name => this.name !== name);
				if(v === true && result.indexOf(this.name) === -1) {
					result.push(this.name);
				}	
				this.$emit('input', result);
			} else {
				this.$emit('input', v);
			}
		}
	},
	methods: {
		toggle() {
			this.active = !this.active;
		},
		isValueArray() {
			return Array.isArray(this.value) && typeof this.name === 'string';
		}
	}
}
</script>

<style lang="stylus">
.checkbox-block
	position relative
	cursor pointer
	.checkbox
		position relative
		height 20px
		width 20px
		border-radius 2px
		z-index 2
		> i
			font-size 20px
	> .checkbox-circle
		position absolute
		top 50%
		left 50%
		transform translate(-50%, -50%)
		height 20px
		width 20px
		transition 200ms linear
		opacity 0.5
		border-radius 50%
		z-index 1
	&:hover
		> .checkbox-circle
			transform translate(-50%, -50%) scale(2)
			opacity 0.1
	&:not(.checked)
		> .checkbox
			background-color #fff !important
			background-color currentColor !important
			border 3px solid #bdbdbd
			border 3px solid var(--grey-5)
			> *
				display none
</style>