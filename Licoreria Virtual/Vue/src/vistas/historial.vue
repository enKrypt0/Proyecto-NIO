<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Historial de Pedidos</h1>
      <p class="text-gray-600">Revisa tus pedidos anteriores</p>
    </div>
    
    <div v-if="carritoStore.pedidos.length === 0" class="bg-white rounded-lg shadow-md p-12 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p class="text-gray-600 text-lg">No tienes pedidos aún</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="pedido in carritoStore.pedidos" :key="pedido.id_pedido"
          class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-semibold text-lg">Pedido #{{ pedido.id_pedido }}</h3>
            <p class="text-gray-600">{{ formatearFecha(pedido.fecha) }}</p>
            <p class="text-sm text-gray-600">{{ pedido.licoreria_nombre }}</p>
            <p class="text-sm text-gray-600 capitalize">{{ pedido.tipo_entrega }}</p>
          </div>
          <div class="text-right">
            <span class="inline-block px-4 py-2 rounded-full text-sm font-medium"
                  :class="obtenerClaseEstado(pedido.estado)">
              {{ obtenerTextoEstado(pedido.estado) }}
            </span>
            <p class="font-bold text-xl mt-2">€{{ pedido.monto_total.toFixed(2) }}</p>
          </div>
        </div>
        
        <!-- Productos del pedido -->
        <div class="mt-4 pt-4 border-t">
          <div class="space-y-2">
            <div v-for="producto in pedido.productos" :key="producto.id_producto" 
                class="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-3">
                <img :src="producto.imagen" :alt="producto.nombre" class="w-10 h-10 object-cover rounded" />
                <div>
                  <p class="text-sm font-medium">{{ producto.nombre }}</p>
                  <p class="text-xs text-gray-600">{{ producto.marca }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium">{{ producto.cantidad }}x €{{ producto.precio }}</p>
                <p class="text-xs text-gray-600">€{{ (producto.precio * producto.cantidad).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCarritoStore } from '../tiendas/carrito'

const carritoStore = useCarritoStore()

const formatearFecha = (fechaString: string) => {
  return new Date(fechaString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const obtenerClaseEstado = (estado: string) => {
  const clases = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    procesando: 'bg-blue-100 text-blue-800',
    entregado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800'
  }
  return clases[estado as keyof typeof clases] || 'bg-gray-100 text-gray-800'
}

const obtenerTextoEstado = (estado: string) => {
  const textos = {
    pendiente: 'Pendiente',
    procesando: 'Procesando',
    entregado: 'Entregado',
    cancelado: 'Cancelado'
  }
  return textos[estado as keyof typeof textos] || estado
}

onMounted(() => {
  carritoStore.cargarPedidos()
})
</script>
