import { createApp } from "vue"
import { createPinia } from "pinia"
import { createRouter, createWebHistory } from "vue-router"
import App from "./App.vue"
import "./style.css"

import Inicio from "./vistas/inicio.vue"
import Carrito from "./vistas/carrito.vue"
import Login from "./vistas/login.vue"
import Historial from "./vistas/historial.vue"

const rutas = [
  { path: "/", component: Inicio },
  { path: "/carrito", component: Carrito },
  { path: "/login", component: Login },
  { path: "/historial", component: Historial },
]

const router = createRouter({
  history: createWebHistory(),
  routes: rutas,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount("#app")
