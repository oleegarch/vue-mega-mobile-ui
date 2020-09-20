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
  	Vue.component('Avatar', Vue.component);
		Vue.component('Button', Vue.component);
		Vue.component('Cell', Vue.component);
		Vue.component('Checkbox', Vue.component);
		Vue.component('CoolContent', Vue.component);
		Vue.component('CoolHeader', Vue.component);
		Vue.component('Div', Vue.component);
		Vue.component('Grid', Vue.component);
		Vue.component('IconBlock', Vue.component);
		Vue.component('ModalPage', Vue.component);
		Vue.component('ModalView', Vue.component);
		Vue.component('OuterInput', Vue.component);
		Vue.component('Radio', Vue.component);
		Vue.component('Tabs', Vue.component);
		Vue.component('Toggle', Vue.component);
		Vue.component('VerticalCell', Vue.component);
  }
}