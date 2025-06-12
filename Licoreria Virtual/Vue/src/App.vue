\<template>
  <div class="h-screen w-screen overflow-hidden">
    <!-- Vista de Login (pantalla completa) -->
    <div v-if="esRutaLogin" class="h-full w-full">
      <router-view />
    </div>

    <!-- Dashboard Layout -->
    <div v-else class="flex h-full w-full">
      <!-- Sidebar -->
      <div class="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex-shrink-0 h-full flex flex-col shadow-2xl">
        <!-- Logo -->
        <div class="flex items-center justify-center h-16 border-b border-gray-700/50 px-2">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <span class="text-lg">🍸</span>
            </div>
            <h1 class="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              NIO Cocktails
            </h1>
          </div>
        </div>

        <!-- Categorías -->
        <div class="px-4 py-4">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">General</p>
        </div>

        <!-- Navegación -->
        <nav class="px-2 pb-4 flex-1">
          <router-link to="/" 
                      class="flex items-center px-4 py-3 mb-2 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                      :class="{ 'bg-gradient-to-r from-red-500 to-red-600 shadow-lg': $route.path === '/' }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="font-medium">Dashboard</span>
          </router-link>

          <router-link to="/carrito" 
                      class="flex items-center px-4 py-3 mb-2 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                      :class="{ 'bg-gradient-to-r from-red-500 to-red-600 shadow-lg': $route.path === '/carrito' }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="font-medium">Carrito</span>
            <span v-if="carritoStore.articulos.length > 0" 
                  class="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-pulse">
              {{ carritoStore.articulos.length }}
            </span>
          </router-link>

          <router-link to="/historial" 
                      class="flex items-center px-4 py-3 mb-2 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                      :class="{ 'bg-gradient-to-r from-red-500 to-red-600 shadow-lg': $route.path === '/historial' }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span class="font-medium">Historial</span>
          </router-link>
        </nav>

        <!-- Categoría Usuario -->
        <div class="px-4 py-4 border-t border-gray-700/50">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Usuario</p>
        </div>

        <!-- Sección de Usuario -->
        <div class="px-2 pb-4">
          <div v-if="authStore.usuario" class="px-4 py-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center mr-3 shadow-lg">
                {{ authStore.usuario.nombre.charAt(0).toUpperCase() }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-white truncate">{{ authStore.usuario.nombre }}</p>
                <p class="text-xs text-gray-300 truncate">{{ authStore.usuario.correo }}</p>
              </div>
            </div>
            <button @click="authStore.cerrarSesion" 
                    class="w-full flex items-center px-3 py-2 rounded-lg hover:bg-red-500/20 transition-all duration-200 text-left group">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span class="text-sm">Cerrar Sesión</span>
            </button>
          </div>
          
          <router-link v-else to="/login" 
                      class="flex items-center px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span class="font-medium">Iniciar Sesión</span>
          </router-link>
        </div>
      </div>

      <!-- Contenido Principal -->
      <div class="flex-1 flex flex-col h-full overflow-hidden">
        <!-- Barra superior -->
        <header class="bg-white/80 backdrop-blur-sm shadow-sm z-10 flex-shrink-0 border-b border-gray-200/50">
          <div class="flex items-center justify-between px-6 h-16">
            <!-- Breadcrumb -->
            <div class="flex items-center">
              <h2 class="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {{ obtenerTituloPagina }}
              </h2>
            </div>
            
            <!-- Acciones de usuario -->
            <div class="flex items-center space-x-4">
              <div v-if="authStore.usuario" class="flex items-center space-x-3">
                <span class="text-sm text-gray-600 font-medium">{{ authStore.usuario.nombre }}</span>
                <div class="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white shadow-lg">
                  {{ authStore.usuario.nombre.charAt(0).toUpperCase() }}
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Área de contenido principal con scroll -->
        <main class="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCarritoStore } from './tiendas/carrito'
import { useAuthStore } from './tiendas/autenticacion'

const route = useRoute()
const carritoStore = useCarritoStore()
const authStore = useAuthStore()

const esRutaLogin = computed(() => route.path === '/login')

const obtenerTituloPagina = computed(() => {
  switch (route.path) {
    case '/':
      return 'Inicio'
    case '/carrito':
      return 'Carrito de Compras'
    case '/historial':
      return 'Historial de Pedidos'
    default:
      return 'NIO Cocktails'
  }
})

onMounted(() => {
  // Cargar datos iniciales
  carritoStore.cargarCarrito()
  carritoStore.cargarPedidos() // Agregar esta línea
  
})
</script>
