// css
import './styles/normalize.styl'
import './styles/colors.styl'
import './styles/text.styl'
import './styles/flex.styl'
import './styles/helpers.styl'
import './styles/indents.styl'
import './styles/positioning.styl'


// components
import Avatar from './components/Avatar.vue'
import Button from './components/Button.vue'
import Cell from './components/Cell.vue'
import Checkbox from './components/Checkbox.vue'
import CoolContent from './components/CoolContent.vue'
import CoolHeader from './components/CoolHeader.vue'
import Div from './components/Div.vue'
import Grid from './components/Grid.vue'
import IconBlock from './components/IconBlock.vue'
import ModalPage from './components/ModalPage.vue'
import ModalView from './components/ModalView.vue'
import OuterInput from './components/OuterInput.vue'
import Radio from './components/Radio.vue'
import Tabs from './components/Tabs.vue'
import Toggle from './components/Toggle.vue'
import VerticalCell from './components/VerticalCell.vue'


export default {
  install(Vue) {
  	Vue.component('Avatar', Avatar);
		Vue.component('Button', Button);
		Vue.component('Cell', Cell);
		Vue.component('Checkbox', Checkbox);
		Vue.component('CoolContent', CoolContent);
		Vue.component('CoolHeader', CoolHeader);
		Vue.component('Div', Div);
		Vue.component('Grid', Grid);
		Vue.component('IconBlock', IconBlock);
		Vue.component('ModalPage', ModalPage);
		Vue.component('ModalView', ModalView);
		Vue.component('OuterInput', OuterInput);
		Vue.component('Radio', Radio);
		Vue.component('Tabs', Tabs);
		Vue.component('Toggle', Toggle);
		Vue.component('VerticalCell', VerticalCell);
  }
}