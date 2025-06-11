import React from 'react'

interface RecomendacionesAutomaticasProps {
  licor: string
  ingredientes: string[]
  frutas: string[]
}

const sugerencias: Record<string, string[]> = {
  Tequila: ['naranja', 'granadina', 'triple sec'],
  Ron: ['coco', 'menta', 'limón'],
  Vodka: ['arándano', 'jugo de naranja', 'limón'],
  Whisky: ['miel', 'limón', 'canela'],
}

const RecomendacionesAutomaticas: React.FC<RecomendacionesAutomaticasProps> = ({
  licor,
  ingredientes,
  frutas,
}) => {
  if (!licor) return null

  const posibles = sugerencias[licor]?.filter(
    ing => !ingredientes.includes(ing) && !frutas.includes(ing)
  ) || []

  return (
    <div className="recomendaciones-automaticas">
      <h3>Recomendaciones Automáticas</h3>
      {posibles.length > 0 ? (
        <ul>
          {posibles.map((ing, idx) => (
            <li key={idx}>Prueba agregar {ing}</li>
          ))}
        </ul>
      ) : (
        <p>No hay más recomendaciones para esta combinación.</p>
      )}
    </div>
  )
}

export default RecomendacionesAutomaticas