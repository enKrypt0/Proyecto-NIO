import React, { useEffect, useState } from 'react'

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

const SelectorIngredientes: React.FC<SelectorIngredientesProps> = ({ licor, ingredientes, setIngredientes }) => {
  const [todos, setTodos] = useState<Ingrediente[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/ingredientes')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Error al obtener ingredientes:', err))
  }, [])

  // Filtrado simple por tipo de licor (puedes mejorar la lógica según tu modelo)
  let opciones: string[] = []
  if (licor) {
    // Ejemplo: puedes filtrar por tipo_ingrediente o por nombre según el licor
    opciones = todos.map(i => i.nombre)
  } else {
    opciones = todos.map(i => i.nombre)
  }

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