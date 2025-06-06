<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from './supabase';

const productos = ref([]);

onMounted(async () => {
  const { data, error } = await supabase.from('producto').select('*');
  if (error) console.error('Error al obtener productos:', error);
  else productos.value = data;
});
</script>

<template>
  <div class="p-6 text-white">
    <h1 class="text-2xl font-bold mb-4">Catálogo</h1>
    <ul>
      <li v-for="p in productos" :key="p.id_producto">
        {{ p.nombre }} - ${{ p.precio }}
      </li>
    </ul>
  </div>
</template>
