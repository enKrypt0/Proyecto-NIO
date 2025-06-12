<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="absolute inset-0 pattern-bg"></div>
    
    <div class="relative bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/20">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4 shadow-lg">
          <span class="text-2xl">🍸</span>
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">
          NIO Cocktails
        </h1>
        <h2 class="text-xl font-semibold text-gray-800">
          {{ esLogin ? 'Iniciar Sesión' : 'Crear Cuenta' }}
        </h2>
        <p class="text-gray-600 mt-2">
          {{ esLogin ? 'Bienvenido de vuelta' : 'Únete a nuestra comunidad' }}
        </p>
      </div>
      
      <form @submit.prevent="manejarEnvio" class="space-y-6">
        <div v-if="!esLogin" class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Nombre completo</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              </svg>
            </div>
            <input 
              v-model="nombre" 
              type="text" 
              required
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              </svg>
            </div>
            <input 
              v-model="correo" 
              type="email" 
              required
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Contraseña</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              </svg>
            </div>
            <input 
              v-model="contraseña" 
              type="password" 
              required
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80"
            />
          </div>
        </div>

        <div v-if="!esLogin" class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Ubicación</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              </svg>
            </div>
            <input 
              v-model="ubicacion" 
              type="text" 
              required
              class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white/80"
            />
          </div>
        </div>
        
        <!-- Botón principal -->
        <button 
          type="submit" 
          :disabled="authStore.cargando"
          class="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
        >
          <span v-if="authStore.cargando" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </span>
          <span v-else>
            {{ esLogin ? 'Iniciar Sesión' : 'Crear Cuenta' }}
          </span>
        </button>
      </form>

      <!-- Divisor -->
      <div class="my-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">o</span>
          </div>
        </div>
      </div>

      <!-- Cambiar modo -->
      <div class="text-center">
        <p class="text-gray-600 mb-4">
          {{ esLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?' }}
        </p>
        <button 
          @click="esLogin = !esLogin" 
          type="button"
          class="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 font-medium transition-all duration-200 border border-gray-300"
        >
          {{ esLogin ? 'Crear nueva cuenta' : 'Iniciar sesión' }}
        </button>
      </div>

      <!-- Usuario logueado -->
      <div v-if="authStore.usuario" class="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium mr-3">
              {{ authStore.usuario.nombre.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="text-sm font-medium text-green-800">{{ authStore.usuario.nombre }}</p>
              <p class="text-xs text-green-600">Sesión activa</p>
            </div>
          </div>
          <button 
            @click="authStore.cerrarSesion" 
            class="text-green-600 hover:text-green-800 transition-colors"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../tiendas/autenticacion'

const router = useRouter()
const authStore = useAuthStore()

const esLogin = ref(true)
const nombre = ref('')
const correo = ref('')
const contraseña = ref('')
const ubicacion = ref('')

const manejarEnvio = async () => {
  try {
    if (esLogin.value) {
      await authStore.iniciarSesion(correo.value, contraseña.value)
      router.push('/')
    } else {
      await authStore.registrarse(nombre.value, correo.value, contraseña.value, ubicacion.value)
      esLogin.value = true
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
</script>

<style scoped>
.pattern-bg {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
