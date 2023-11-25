import { createApp } from "vue";
import App from "./App.vue";

import 'primevue/resources/themes/saga-blue/theme.css';
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import PrimeVue from 'primevue/config';

createApp(App).use(PrimeVue).mount("#app");
