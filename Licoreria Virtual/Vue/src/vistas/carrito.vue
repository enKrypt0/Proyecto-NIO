<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Mi Carrito</h1>
      <p class="text-gray-600">Gestiona tus productos y finaliza tu compra</p>
    </div>

    <div v-if="carritoStore.articulos.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <p class="text-gray-600 mb-4 text-lg">Tu carrito está vacío</p>
      <router-link to="/" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-block">
        Ver Productos
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Lista de productos -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-lg font-medium mb-4">Productos en carrito</h2>

          <div class="space-y-4">
            <div v-for="articulo in carritoStore.articulos" :key="articulo.id_producto"
              class="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div class="flex items-center space-x-4">
                <img :src="articulo.imagen" :alt="articulo.nombre" class="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 class="font-bold">{{ articulo.nombre }}</h3>
                  <p class="text-gray-600">{{ articulo.marca }} - {{ articulo.tipo }}</p>
                  <p class="text-gray-600">€{{ articulo.precio }} x {{ articulo.cantidad }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <span class="font-bold">€{{ (articulo.precio * articulo.cantidad).toFixed(2) }}</span>
                <button @click="carritoStore.eliminarDelCarrito(articulo.id_producto)"
                  class="text-red-600 hover:text-red-800">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Resumen y checkout -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-6">
          <h2 class="text-lg font-medium mb-4">Resumen de compra</h2>

          <div class="space-y-4">
            <!-- Selección de licorería -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Licorería:</label>
              <select v-model="licoreriaSeleccionada" class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option value="">Selecciona una licorería...</option>
                <option v-for="licoreria in licorerias" :key="licoreria.id_licoreria" :value="licoreria.id_licoreria">
                  {{ licoreria.nombre }} - {{ licoreria.direccion }}
                </option>
              </select>
            </div>

            <!-- Tipo de entrega -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de entrega:</label>
              <div class="space-y-2">
                <label class="flex items-center p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" v-model="tipoEntrega" value="domicilio" class="mr-2" />
                  <span>Entrega a domicilio</span>
                </label>
                <label class="flex items-center p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" v-model="tipoEntrega" value="recogida" class="mr-2" />
                  <span>Recoger en tienda</span>
                </label>
              </div>
            </div>

            <!-- Total -->
            <div class="border-t pt-4">
              <div class="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>€{{ carritoStore.total.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>€{{ carritoStore.total.toFixed(2) }}</span>
              </div>
            </div>

            <button @click="realizarCompra"
              :disabled="!licoreriaSeleccionada || !tipoEntrega || carritoStore.cargando"
              class="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">
              <span v-if="carritoStore.cargando">Procesando...</span>
              <span v-else>Finalizar Compra</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCarritoStore } from '../tiendas/carrito'
import { useAuthStore } from '../tiendas/autenticacion'

const router = useRouter()
const carritoStore = useCarritoStore()
const authStore = useAuthStore()

const licorerias = ref<any[]>([])
const licoreriaSeleccionada = ref('')
const tipoEntrega = ref('')

onMounted(async () => {
  licorerias.value = await carritoStore.cargarLicorerias()
})

const realizarCompra = async () => {
  if (!authStore.usuario) {
    router.push('/login')
    return
  }

  if (!licoreriaSeleccionada.value || !tipoEntrega.value) {
    alert('Por favor selecciona una licorería y tipo de entrega')
    return
  }

  try {
    await carritoStore.finalizarCompra(
      parseInt(licoreriaSeleccionada.value, 10),  // Asegura que sea número
      tipoEntrega.value
    )
    router.push('/historial')
  } catch (error) {
    console.error('Error en compra:', error)
    alert('Error al finalizar la compra.')
  }
}
</script>
