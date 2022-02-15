import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import { Tabbar, TabbarItem,NavBar, Toast, Swipe, SwipeItem,Divider,Form,Field, Button, Tab, Tabs, Empty, Cell, Loading, Col, Row,Image, NoticeBar,Tag, Icon, Overlay, List, CellGroup, Popup, Picker, Radio, RadioGroup, Search, Grid, GridItem, Slider } from 'vant';

Vue.use(Tabbar)
.use(TabbarItem)
.use(NavBar)
.use(Swipe)
.use(SwipeItem)
.use(Divider)
.use(Form)
.use(Field)
.use(Button)
.use(Tab)
.use(Tabs)
.use(Empty)
.use(Cell)
.use(Loading)
.use(Col)
.use(Row)
.use(Image)
.use(NoticeBar)
.use(Tag)
.use(Icon)
.use(Overlay)
.use(List)
.use(Cell)
.use(CellGroup)
.use(Popup)
.use(Picker)
.use(Radio)
.use(RadioGroup)
.use(Search)
.use(Grid)
.use(GridItem)
.use(Slider)

Vue.use(VueLazyLoad,{
  error:require('../src/assets/img/loading.gif'),
  loading:require('../src/assets/img/loading.gif')
})

axios.defaults.baseURL = 'http://127.0.0.1:8000/'

Vue.config.productionTip = false
Vue.prototype.$toast = Toast
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
