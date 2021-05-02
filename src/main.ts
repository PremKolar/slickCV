import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(faUserSecret);
library.add(faSpinner);
library.add(fas);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
