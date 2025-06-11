import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { supabase, type Producto, type ArticuloCarrito, type Pedido, type PedidoDetalle } from "../conexion/supabase"
import { useAuthStore } from "./autenticacion"

export const useCarritoStore = defineStore("carrito", () => {
  const authStore = useAuthStore()
  const articulos = ref<ArticuloCarrito[]>([])
  const pedidos = ref<Pedido[]>([])
  const cargando = ref<boolean>(false)

  const total = computed(() => articulos.value.reduce((sum, item) => sum + item.precio * item.cantidad, 0))

  const totalItems = computed(() => articulos.value.reduce((sum, item) => sum + item.cantidad, 0))

  // Función vacía para compatibilidad (el carrito se mantiene en memoria)
  const cargarCarrito = () => {
    // No hace nada porque el carrito se mantiene en memoria
    console.log("Carrito cargado (en memoria)")
  }

  const agregarAlCarrito = (producto: Producto): void => {
    const existente = articulos.value.find((item) => item.id_producto === producto.id_producto)

    if (existente) {
      existente.cantidad++
    } else {
      articulos.value.push({ ...producto, cantidad: 1 })
    }
  }

  const eliminarDelCarrito = (productId: number): void => {
    articulos.value = articulos.value.filter((item) => item.id_producto !== productId)
  }

  const vaciarCarrito = (): void => {
    articulos.value = []
  }

  const finalizarCompra = async (idLicoreria: number, tipoEntrega: string): Promise<Pedido> => {
    if (!authStore.usuario) {
      throw new Error("Debes iniciar sesión para comprar")
    }

    if (articulos.value.length === 0) {
      throw new Error("El carrito está vacío")
    }

    cargando.value = true

    try {
      // Crear el pedido en Supabase
      const { data: nuevoPedido, error: errorPedido } = await supabase
        .from("pedido")
        .insert({
          id_usuario: authStore.usuario.id_usuario,
          id_licoreria: idLicoreria,
          tipo_entrega: tipoEntrega,
          estado: "pendiente",
          fecha: new Date().toISOString(),
          monto_total: total.value
        })
        .select()
        .single()

      if (errorPedido) {
        throw new Error("Error al crear el pedido: " + errorPedido.message)
      }

      // Crear los detalles del pedido
      const detallesPedido: Omit<PedidoDetalle, 'id_pedido_detalle'>[] = articulos.value.map(item => ({
        id_pedido: nuevoPedido.id_pedido,
        id_producto: item.id_producto,
        cantidad: item.cantidad
      }))

      const { error: errorDetalles } = await supabase
        .from("pedido_detalle")
        .insert(detallesPedido)

      if (errorDetalles) {
        throw new Error("Error al guardar los detalles: " + errorDetalles.message)
      }

      // Agregar el pedido al estado local
      pedidos.value.unshift(nuevoPedido)

      // Limpiar carrito
      vaciarCarrito()

      alert("¡Compra realizada exitosamente!")
      return nuevoPedido
    } catch (error: any) {
      console.error("Error en la compra:", error)
      alert("Error en la compra: " + error.message)
      throw error
    } finally {
      cargando.value = false
    }
  }

  const cargarPedidos = async (): Promise<void> => {
    if (!authStore.usuario) {
      // Si no hay usuario, simplemente no cargar pedidos
      pedidos.value = []
      return
    }

    try {
      cargando.value = true

      const { data, error } = await supabase
        .from("pedido")
        .select("*")
        .eq("id_usuario", authStore.usuario.id_usuario)
        .order("fecha", { ascending: false })

      if (error) {
        console.error("Error al cargar pedidos:", error.message)
        return
      }

      pedidos.value = data || []
    } catch (error: any) {
      console.error("Error al cargar pedidos:", error)
    } finally {
      cargando.value = false
    }
  }

  const obtenerDetallesPedido = async (idPedido: number): Promise<ArticuloCarrito[]> => {
    try {
      // Obtener detalles del pedido
      const { data: detalles, error: errorDetalles } = await supabase
        .from("pedido_detalle")
        .select("*")
        .eq("id_pedido", idPedido)

      if (errorDetalles) {
        throw new Error("Error al cargar detalles: " + errorDetalles.message)
      }

      if (!detalles || detalles.length === 0) {
        return []
      }

      // Obtener información de los productos
      const productosIds = detalles.map(d => d.id_producto)
      const { data: productos, error: errorProductos } = await supabase
        .from("producto")
        .select("*")
        .in("id_producto", productosIds)

      if (errorProductos) {
        throw new Error("Error al cargar productos: " + errorProductos.message)
      }

      // Combinar detalles con productos
      const productosConCantidad: ArticuloCarrito[] = detalles.map(detalle => {
        const producto = productos?.find(p => p.id_producto === detalle.id_producto)
        return {
          ...producto,
          cantidad: detalle.cantidad
        } as ArticuloCarrito
      })

      return productosConCantidad
    } catch (error: any) {
      console.error("Error al obtener detalles del pedido:", error)
      return []
    }
  }

  const cargarProductos = async (): Promise<Producto[]> => {
    try {
      const { data, error } = await supabase
        .from("producto")
        .select("*")

      if (error) {
        throw new Error("Error al cargar productos: " + error.message)
      }

      return data || []
    } catch (error: any) {
      console.error("Error al cargar productos:", error)
      return []
    }
  }

  const cargarLicorerias = async (): Promise<any[]> => {
    try {
      const { data, error } = await supabase
        .from("licoreria")
        .select("*")

      if (error) {
        throw new Error("Error al cargar licorerias: " + error.message)
      }

      return data || []
    } catch (error: any) {
      console.error("Error al cargar licorerias:", error)
      return []
    }
  }

  // Inicializar datos cuando el usuario esté autenticado
  const inicializar = async () => {
    if (authStore.usuario) {
      await cargarPedidos()
    } else {
      articulos.value = []
      pedidos.value = []
    }
  }

  return {
    articulos,
    pedidos,
    cargando,
    total,
    totalItems,
    agregarAlCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
    cargarCarrito,
    finalizarCompra,
    cargarPedidos,
    obtenerDetallesPedido,
    cargarProductos,
    cargarLicorerias,
    inicializar,
  }
})