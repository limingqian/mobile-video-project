import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Button } from 'vant'; // 按需引入vant组件
import { Image as VanImage } from 'vant';
import { Grid, GridItem } from 'vant';
import { Search } from 'vant';
import { Col, Row } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { NavBar } from 'vant';
import { Field } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Form } from 'vant';
import { DropdownMenu, DropdownItem } from 'vant';
import { Tab, Tabs } from 'vant';

// import VueVideoPlayer from 'vue-video-player';
// // require videojs style
// import 'video.js/dist/video-js.css';
// // import 'vue-video-player/src/custom-theme.css'

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Search);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Form);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Tab);
Vue.use(Tabs);

// Vue.use(VueVideoPlayer /* {
//   options: global default options,
//   events: global videojs events
// } */);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
