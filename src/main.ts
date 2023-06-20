import { createApp, ComponentPublicInstance } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
import naive from "naive-ui";
import { auth } from "@/firebase/firebase";

/* CSS styles */
import "@/assets/style/index.scss";

let appVue: ComponentPublicInstance;

auth.onAuthStateChanged(() => {
  if (!appVue) {
    appVue = createApp(App)
      .use(naive)
      .use(store, key)
      .use(router)
      .mount("#app");
  }
});
