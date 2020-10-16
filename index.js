// css
import './styles/normalize.styl'
import './styles/colors.styl'
import './styles/text.styl'
import './styles/flex.styl'
import './styles/helpers.styl'
import './styles/indents.styl'
import './styles/positioning.styl'

// utils
import * as $window from './utils/window.js'
import * as eventsExported from './utils/events.js'
import * as stylesExported from './utils/styles.js'
import clearSelectionExported from './utils/clearSelection.js'
import skewEffectDirectiveExported from './utils/skewEffectDirective.js'
export const events = eventsExported;
export const styles = stylesExported;
export const clearSelection = clearSelectionExported;
export const skewEffectDirective = skewEffectDirectiveExported;


// components
import Avatar from './components/Avatar.vue'
import Button from './components/Button.vue'
import Cell from './components/Cell.vue'
import Checkbox from './components/Checkbox.vue'
import CoolContent from './components/CoolContent.vue'
import CoolHeader from './components/CoolHeader.vue'
import Div from './components/Div.vue'
import Grid from './components/Grid.vue'
import Icon from './components/Icon.vue'
import IconBlock from './components/IconBlock.vue'
import ModalPage from './components/ModalPage.vue'
import ModalDialog from './components/ModalDialog.vue'
import ModalView from './components/ModalView.vue'
import OuterInput from './components/OuterInput.vue'
import Radio from './components/Radio.vue'
import Tabs from './components/Tabs.vue'
import Toggle from './components/Toggle.vue'
import Progress from './components/Progress.vue'
import VerticalCell from './components/VerticalCell.vue'
import Container from './components/Container.vue'
import ContainerHeader from './components/ContainerHeader.vue'
import ContainerContent from './components/ContainerContent.vue'
import Chip from './components/Chip.vue'
import Panels from './components/Panels.vue'
import BottomLayout from './components/BottomLayout.vue'

export default {
  install(Vue) {
  	Vue.prototype.$window = $window;
  	Vue.$megaUI = {};
  	Vue.$megaUI.events = events;
  	Vue.$megaUI.skewEffectDirective = skewEffectDirective;
  	Vue.$megaUI.styles = styles;
  	Vue.prototype.$megaUI = Vue.$megaUI;
  	Vue.component('Avatar', Avatar);
		Vue.component('Button', Button);
		Vue.component('Cell', Cell);
		Vue.component('Checkbox', Checkbox);
		Vue.component('CoolContent', CoolContent);
		Vue.component('CoolHeader', CoolHeader);
		Vue.component('Div', Div);
		Vue.component('Grid', Grid);
		Vue.component('Icon', Icon);
		Vue.component('IconBlock', IconBlock);
		Vue.component('ModalPage', ModalPage);
		Vue.component('ModalDialog', ModalDialog);
		Vue.component('ModalView', ModalView);
		Vue.component('OuterInput', OuterInput);
		Vue.component('Radio', Radio);
		Vue.component('Tabs', Tabs);
		Vue.component('Toggle', Toggle);
		Vue.component('Progress', Progress);
		Vue.component('VerticalCell', VerticalCell);
		Vue.component('Container', Container);
		Vue.component('ContainerHeader', ContainerHeader);
		Vue.component('ContainerContent', ContainerContent);
		Vue.component('Chip', Chip);
		Vue.component('Panels', Panels);
		Vue.component('BottomLayout', BottomLayout);
  }
}