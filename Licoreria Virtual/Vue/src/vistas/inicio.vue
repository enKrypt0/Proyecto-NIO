<template>
  <div class="p-6">
    <!-- Título y breadcrumb -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
        Inicio
      </h1>
      <p class="text-gray-600">Bienvenido a NIO Cocktails - Tu tienda de bebidas premium</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex items-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div class="rounded-full bg-gradient-to-r from-green-400 to-green-500 p-4 mr-4 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-gray-600 font-medium">Productos Disponibles</p>
          <p class="text-3xl font-bold text-gray-800">{{ productos.length }}</p>
        </div>
      </div>
      
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex items-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div class="rounded-full bg-gradient-to-r from-blue-400 to-blue-500 p-4 mr-4 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-gray-600 font-medium">En Carrito</p>
          <p class="text-3xl font-bold text-gray-800">{{ carritoStore.articulos.length }}</p>
        </div>
      </div>
      
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex items-center border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div class="rounded-full bg-gradient-to-r from-red-400 to-red-500 p-4 mr-4 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-gray-600 font-medium">Total Carrito</p>
          <p class="text-3xl font-bold text-gray-800">€{{ carritoStore.total.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/20">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-800">Productos Destacados</h2>
        <button class="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
          Ver todos
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="producto in productos.slice(0, 8)" :key="producto.id_producto" 
            class="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-[1.02] group">
          <div class="relative overflow-hidden rounded-lg mb-4">
            <img :src="producto.imagen || 'https://via.placeholder.com/150'" :alt="producto.nombre" 
                class="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110" />
            <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h3 class="font-bold text-lg text-gray-800 mb-1 truncate">{{ producto.nombre }}</h3>
          <p class="text-gray-600 text-sm mb-1">{{ producto.marca }}</p>
          <p class="text-gray-500 text-xs mb-3">{{ producto.tipo }}</p>
          <div class="flex justify-between items-center">
            <span class="text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              €{{ producto.precio }}
            </span>
            <button @click="carritoStore.agregarAlCarrito(producto)"
                    class="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 text-sm font-medium">
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCarritoStore } from '../tiendas/carrito'
import { supabase } from '../conexion/supabase'
import type { Producto } from '../conexion/supabase'

const carritoStore = useCarritoStore()
const productos = ref<Producto[]>([])

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('producto')
      .select('*')

    if (error) {
      console.error('Error:', error)
      cargarDatosEjemplo()
    } else if (data && data.length > 0) {
      productos.value = data
    } else {
      cargarDatosEjemplo()
    }
  } catch (error) {
    console.error('Error al cargar productos:', error)
    cargarDatosEjemplo()
  }
})

function cargarDatosEjemplo() {
  productos.value = [
    {
      id_producto: 1,
      nombre: 'Gin Tonic Premium',
      marca: 'London Dry',
      tipo: 'Gin',
      precio: 12.99,
      imagen: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id_producto: 2,
      nombre: 'Mojito Clásico',
      marca: 'Havana',
      tipo: 'Ron',
      precio: 9.99,
      imagen: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id_producto: 3,
      nombre: 'Whisky Escocés',
      marca: 'Highland',
      tipo: 'Whisky',
      precio: 24.99,
      imagen: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id_producto: 4,
      nombre: 'Margarita',
      marca: 'Tequila Gold',
      tipo: 'Tequila',
      precio: 10.99,
      imagen: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id_producto: 5,
      nombre: 'Vodka Tonic',
      marca: 'Crystal',
      tipo: 'Vodka',
      precio: 11.99,
      imagen: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
      id_producto: 6,
      nombre: 'Piña Colada',
      marca: 'Caribbean',
      tipo: 'Ron',
      precio: 8.99,
      imagen: 'https://images.unsplash.com/photo-1549746423-e5bf9b8d7ee7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    }
  ]
}
</script>
