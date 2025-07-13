import React, { useEffect, useState } from 'react'
import supabase from '../../config/supabase'

interface SelectorIngredientesProps {
  licor: string
  ingredientes: string[]
  setIngredientes: (ingredientes: string[]) => void
}

interface Ingrediente {
  id: string
  nombre: string
  tipo_ingrediente: string
}

const SelectorIngredientes: React.FC<SelectorIngredientesProps> = ({ ingredientes, setIngredientes }) => {
  const [opciones, setOpciones] = useState<string[]>([])

  useEffect(() => {
    const fetchIngredientes = async () => {
      const { data, error } = await supabase.from('ingredientes').select('*')
      if (error) {
        console.error('Error al obtener ingredientes:', error)
        return
      }
      setOpciones(data ? data.map((i: Ingrediente) => i.nombre) : [])
    }
    fetchIngredientes()
  }, [])

  const handleClick = (value: string) => {
    setIngredientes(
      ingredientes.includes(value)
        ? ingredientes.filter(i => i !== value)
        : [...ingredientes, value]
    )
  }

  return (
    <div className="selector-ingredientes">
      <h3>Selecciona ingredientes</h3>
      <div className="ingredientes-botones">
        {opciones.map(op => (
          <button
            key={op}
            type="button"
            className={`ingrediente-boton${ingredientes.includes(op) ? ' seleccionado' : ''}`}
            onClick={() => handleClick(op)}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SelectorIngredientes