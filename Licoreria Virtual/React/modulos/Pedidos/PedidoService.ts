import supabase from '../../src/config/supabase'
import { ItemCarrito } from './Carrito.tsx';

export async function enviarPedido(usuario_id: string, items: ItemCarrito[]) {
  // Se crea el pedido
  const { data: pedido, error: errorPedido } = await supabase
    .from('pedidos')
    .insert([{ usuario_id }])
    .select()
    .single();

  if (errorPedido || !pedido) throw new Error('Error al crear pedido');

  // Se crean los detalles del pedido
  const detalles = items.map(item => ({
    pedido_id: pedido.id,
    producto_id: item.producto_id || null,
    coctel_id: item.coctel_id || null,
    cantidad: item.cantidad,
    precio_unitario: item.precio_unitario
  }));

  const { error: errorDetalles } = await supabase
    .from('detalles_pedido')
    .insert(detalles);

  if (errorDetalles) throw new Error('Error al crear detalles del pedido');

  return pedido;
}