import React, { useEffect, useState } from 'react'

interface SelectorFrutasProps {
  licor: string
  frutas: string[]
  setFrutas: (frutas: string[]) => void
}

interface Fruta {
  id: string
  nombre: string
}

const SelectorFrutas: React.FC<SelectorFrutasProps> = ({frutas, setFrutas }) => {
  const [opciones, setOpciones] = useState<string[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/frutas')
      .then(res => res.json())
      .then(data => setOpciones(data.map((f: Fruta) => f.nombre)))
      .catch(err => console.error('Error al obtener frutas:', err))
  }, [])

  const handleClick = (value: string) => {
    setFrutas(
      frutas.includes(value)
        ? frutas.filter(f => f !== value)
        : [...frutas, value]
    )
  }

  return (
    <div className="selector-frutas">
      <h3>Selecciona frutas</h3>
      <div className="ingredientes-botones">
        {opciones.map(op => (
          <button
            key={op}
            type="button"
            className={`ingrediente-boton${frutas.includes(op) ? ' seleccionado' : ''}`}
            onClick={() => handleClick(op)}
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SelectorFrutas