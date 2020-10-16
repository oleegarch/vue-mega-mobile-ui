<template>
	<div class="outer-input-wrapper">
		<label
			v-if="label"
			:for="name"
			class="text-sm text-grey"
		>
			<span>{{ label }}</span>
		</label>
		<div
			v-animate
			ref="outerInput"
			class="outer-input flex items-center"
			:class="{'focused': focused, 'has-text': hasText, 'error': !!error}"
			@click="focusInput"
		>
			<div class="flex-center outer-input-before">
				<slot name="before"/>
			</div>
			<input
				v-model="input"
				ref="input"
				:type="type"
				:placeholder="placeholder"
				:name="name"
				@focus="onFocus"
				@blur="onBlur"
			/>
			<div class="outer-input-line" :style="{'transform-origin': originX + '% 50%'}"></div>
			<div class="flex-center outer-input-after">
				<slot name="after"/>
				<i v-if="clearable && hasText" class="material-icons" @click="clear">clear</i>
			</div>
		</div>
	</div>
</template>


<script>
import { getCoords, bindDirectiveEvents, unbindDirectiveEvents } from '../utils/events.js';

export default {
	data() {
		return {
			focused: !!this.focus,
			input: this.value,
			originX: 50
		}
	},
	props: {
		value: [String,Number,Boolean],
		type: String,
		name: String,
		placeholder: String,
		label: String,
		focus: Boolean,
		clearable: Boolean,
		error: [String,Boolean]
	},
	watch: {
		value(v, pv) {
			if(v !== pv) {
				this.input = v;
			}
		},
		input(v, pv) {
			if(v !== pv) {
				this.$emit('input', v);
			}
		}
	},
	computed: {
		hasText() {
			return String(this.input).length;
		}
	},
	methods: {
		onDown(e) {
			const coords = getCoords(e);
			this.originX = Math.min(100, Math.max(0, Number((coords.x / this.$refs.outerInput.clientWidth * 100).toFixed(1))));
		},
		onFocus(e) {
			this.focused = true;
		},
		onBlur(e) {
			this.focused = false;
		},
		focusInput() {
			this.$refs.input.focus && this.$refs.input.focus();
		},
		clear() {
			this.input = '';
		}
	},
	directives: {
		animate: {
			bind: bindDirectiveEvents(),
			unbind: unbindDirectiveEvents()
		}
	}
}
</script>


<style lang="stylus">
.outer-input
	position relative
	width 100%
	height 40px
	border-bottom 1px solid #eee
	padding 5px 20px
	background-color #fff
	overflow hidden
	> input
		width 100%
		height 100%
		border 0
		outline 0
		padding 0
	> .outer-input-line
		position absolute
		bottom -1px
		left 0
		width 100%
		height 3px
		background-color var(--blue)
		transform scaleX(0)
		transition transform 200ms ease
	> .outer-input-before
		color #ccc
	> .outer-input-after
		color #ccc
	&.focused
		> .outer-input-line
			transform scaleX(1)
	&.focused,
	&.has-text
		> .outer-input-before
			color #aaa
		> .outer-input-after
			color var(--red)
	&.focused,
	&.focused > input
		background-color #eee
	&.error
		> .outer-input-line
			transform scaleX(1)
			background-color var(--red)
</style>