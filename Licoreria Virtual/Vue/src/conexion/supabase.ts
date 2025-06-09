import { createClient } from "@supabase/supabase-js"

const urlSupabase = 'https://gparzellovdggnwqglhk.supabase.co'; 
const claveSupabase = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYXJ6ZWxsb3ZkZ2dud3FnbGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODM0MjgsImV4cCI6MjA2MzM1OTQyOH0.dv6E8l78SCkb9yRyej5OnjfmCTYZigApTTecDhdtd7c'; 

export const supabase = createClient(urlSupabase, claveSupabase)

export type Usuario = {
  id_usuario: number
  nombre: string
  correo: string
  contraseña: string
  ubicacion: string
}

export type Producto = {
  id_producto: number
  nombre: string
  tipo: string
  marca: string
  precio: number
  imagen: string
}

export type Licoreria = {
  id_licoreria: number
  nombre: string
  direccion: string
  zona: string
  horario: string
}

export type ArticuloCarrito = Producto & {
  cantidad: number
}

export type Pedido = {
  id_pedido: number
  id_usuario: number
  id_licoreria: number
  tipo_entrega: string
  estado: string
  fecha: string
  monto_total: number
}

export type PedidoDetalle = {
  id_pedido_detalle: number
  id_pedido: number
  id_producto: number
  cantidad: number
}
