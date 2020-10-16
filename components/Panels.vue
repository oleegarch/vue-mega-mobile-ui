<template>
	<div class="panels fit">
		<div
			v-for="{ name } in panels"
			:key="name"
			class="panel fit overflow-auto"
			:class="activePanel === name ? 'active' : null"
			:style="{
				'display': !isActive(name) ? 'none' : null,
				'paddingTop': getSafeAreas('top') + 'px'
			}"
		>
			<slot
				v-if="isAlive(name) || isActive(name)"
				:name="name"
			/>
		</div>
	</div>
</template>


<script>
import { getSafeAreas } from '../utils/styles.js'

export default {
	data() {
		return {
			panelsAlive: [],
			activePanel: this.value
		}
	},
	props: {
		panels: Array,
		value: String
	},
	watch: {
		value(v, pv) {
			this.activePanel = v;
		},
		activePanel(v, pv) {
			if(this.panelsAlive.indexOf(v) === -1) {
				this.panelsAlive.push(v);
			}
			this.$emit('value', v);
		}
	},
	methods: {
		getSafeAreas,
		setActivePanel(name) {
			this.activePanel = name;
		},
		isAlive(panel) {
			return this.panelsAlive.findIndex(panelAlive => panel === panelAlive) > -1;
		},
		isActive(panel) {
			return this.activePanel === panel;
		}
	},
}
</script>