/* Import Vue */
import App from "@/App.vue";
import router from "@/router";
import { createApp } from "vue";
import { createPinia } from "pinia";
/* Import CSS */
import "uno.css";
import "@/style.scss";

const app = createApp(App);
app.use(router);
app.use(createPinia());

app.config.globalProperties.isBlogOwner = isBlogOwner;
app.config.globalProperties.isLogined = isLogined;

EcyVars.useLite(
  () => app.mount("#app"),
  () => app.mount("#app")
);
