import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

globalThis.PEER;
globalThis.SELF_STREAM;

app.use(pinia);
app.use(router);
app.mount("#app");
