import { createApp } from 'vue';
import { Button, Image as VanImage, Col, Row, Icon, Form, Field, CellGroup, ConfigProvider, Toast, Uploader, Empty, Tab, Tabs, Overlay, NumberKeyboard } from 'vant';
import router from './router';
import App from './App.vue';
import axios from './utils/axios';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(Button);
app.use(VanImage);
app.use(Col);
app.use(Row);
app.use(Icon);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Toast);
app.use(Uploader);
app.use(Empty);
app.use(Tab);
app.use(Tabs);
app.use(Overlay);
app.use(NumberKeyboard);

app.use(ConfigProvider);

app.config.globalProperties.$http = axios; // 关键语句

app.mount('#app');
