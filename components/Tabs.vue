<template>
	<div
		class="tabs"
		:class="{'stretch-tabs': stretchTabs}"
	>
		<div
			class="tab-titles flex"
			:style="{
				'position': sticky ? 'sticky' : null,
				'top': sticky ? typeof sticky === 'string' ? sticky : 0 : null
			}"
			@touchstart="stopPropagation"
			@touchmove="stopPropagation"
			@touchend="stopPropagation"
		>
			<div
				v-for="tab in tabs"
				:key="`tab-title-${tab.name}`"
				:ref="`tabTitle_${tab.name}`"
				class="tab-title"
				@click="setActiveTab(tab.name)"
			>
				<span :ref="`tabTitleSpan_${tab.name}`">{{ tab.title }}</span>
			</div>
			<div ref="titlesLineWrapper" class="tab-titles-line-wrapper">
				<div ref="titlesLine" class="tab-titles-line"></div>
			</div>
		</div>
		<div class="tab-contents">
			<div
				v-for="name in tabNames"
				:key="`tab-content-${name}`"
				class="tab-content"
				:class="`tab-content-${name}`"
				:style="{'display': isAlive(name) && !isActive(name) ? 'none' : null}"
			>
				<slot
					v-if="isAlive(name) || isActive(name)"
					:name="name"
				/>
			</div>
		</div>
	</div>
</template>


<script>
export default {
	data() {
		return {
			tabsAlive: [],
			activeTab: this.defaultTab || (this.tabs[0] || {}).name || null
		}
	},
	props: {
		defaultTab: String,
		sticky: String,
		tabs: Array
	},
	computed: {
		tabNames() {
			return this.tabs.map(t => t.name);
		},
		stretchTabs() {
			return this.tabs.length <= 3;
		}
	},
	watch: {
		activeTab(v) {
			if(this.tabsAlive.indexOf(v) === -1) {
				this.tabsAlive.push(v);
			}
			this.moveLineToTitle(v);
		}
	},
	methods: {
		moveLineToTitle(name) {
			const ref = (this.$refs['tabTitle_' + name] || [])[0];
			const span = (this.$refs['tabTitleSpan_' + name] || [])[0];
			if(ref) {
				this.$refs.titlesLineWrapper.style.top = ref.offsetTop + 'px';
				this.$refs.titlesLineWrapper.style.left = ref.offsetLeft + 'px';
				this.$refs.titlesLineWrapper.style.height = ref.clientHeight + 'px';
				this.$refs.titlesLineWrapper.style.width = ref.clientWidth + 'px';
			}
			if(span) {
				const spanWidth = span.offsetWidth + 10;
				this.$refs.titlesLine.style.width = spanWidth + 'px';
				this.$refs.titlesLine.style.left = ((ref.clientWidth - spanWidth) / 2) + 'px'
			}
		},
		stopPropagation(event) {
			event.stopPropagation();
		},
		setActiveTab(name) {
			this.activeTab = name;
		},
		isAlive(tab) {
			return this.tabsAlive.findIndex(tabAlive => tab === tabAlive) > -1;
		},
		isActive(tab) {
			return this.activeTab === tab;
		}
	},
	mounted() {
		this.$nextTick(() => {
			setTimeout(() => {
				this.moveLineToTitle(this.activeTab);
			}, 50)
		})
	}
}
</script>


<style lang="stylus">
.tabs
	> .tab-titles
		position relative
		width 100%
		overflow-x auto
		background-color #fff
		border-bottom 1px solid #eee
		> .tab-title
			text-align center
			padding 10px
			font-weight bold
		> .tab-titles-line-wrapper
			position absolute
			top 0
			left 0
			transition all 200ms ease
			height 100%
			width 100%
			> .tab-titles-line
				position absolute
				bottom 5px
				left 5px
				height 4px
				width 100%
				width calc(100% - 10px)
				border-radius 2px
				background-color var(--blue-6)
	> .tab-contents
		> .tab-content {}
	&.stretch-tabs
		> .tab-titles
			> .tab-title
				width 100%
</style>