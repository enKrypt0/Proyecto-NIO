import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ItemCarrito {
  producto_id?: string;
  coctel_id?: string;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
  imagen?: string;
  licor?: string;
  marca?: string;
  ingredientes?: string[];
  frutas?: string[];
}

interface CarritoContextProps {
  items: ItemCarrito[];
  agregar: (item: ItemCarrito) => void;
  quitar: (id: string) => void;
  limpiar: () => void;
  setCantidad: (id: string, cantidad: number) => void;
}

const CarritoContext = createContext<CarritoContextProps | undefined>(undefined);

export const useCarrito = () => {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  return ctx;
};

export const CarritoProvider: React.FC<{ children: React.ReactNode; usuarioId?: string }> = ({ children, usuarioId }) => {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  // Cargar carrito de localStorage cuando cambia el usuario
  useEffect(() => {
    if (usuarioId) {
      const guardado = localStorage.getItem(`carrito_${usuarioId}`);
      setItems(guardado ? JSON.parse(guardado) : []);
    } else {
      setItems([]);
    }
  }, [usuarioId]);

  // Guardar carrito en localStorage cuando cambian los items
  useEffect(() => {
    if (usuarioId) {
      localStorage.setItem(`carrito_${usuarioId}`, JSON.stringify(items));
    }
  }, [items, usuarioId]);

  const agregar = (item: ItemCarrito) => {
    setItems(prev => {
      const idx = prev.findIndex(i => (i.producto_id || i.coctel_id) === (item.producto_id || item.coctel_id));
      if (idx >= 0) {
        const copia = [...prev];
        copia[idx].cantidad += item.cantidad;
        return copia;
      }
      return [...prev, item];
    });
  };

  const quitar = (id: string) => {
    setItems(prev => prev.filter(i => (i.producto_id || i.coctel_id) !== id));
  };

  const limpiar = () => {
    setItems([]);
  };

  const setCantidad = (id: string, cantidad: number) => {
    setItems(prev =>
      prev.map(i => (i.producto_id || i.coctel_id) === id ? { ...i, cantidad } : i)
    );
  };

  return (
    <CarritoContext.Provider value={{ items, agregar, quitar, limpiar, setCantidad }}>
      {children}
    </CarritoContext.Provider>
  );
};