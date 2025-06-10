import React from 'react'

interface IngredientesSeleccionadosProps {
  licor: string
  marca?: string
  ingredientes: string[]
  frutas: string[]
}

const IngredientesSeleccionados: React.FC<IngredientesSeleccionadosProps> = ({ licor, marca, ingredientes, frutas }) => (
  <div className="ingredientes-seleccionados">
    <h4>Ingredientes Seleccionados</h4>
    <ul>
      <li><strong>Licor:</strong> {licor || 'Ninguno'}</li>
      {marca !== undefined && (
        <li><strong>Marca:</strong> {marca || 'Ninguna'}</li>
      )}
      <li><strong>Ingredientes:</strong> {ingredientes.length ? ingredientes.join(', ') : 'Ninguno'}</li>
      <li><strong>Frutas:</strong> {frutas.length ? frutas.join(', ') : 'Ninguna'}</li>
    </ul>
  </div>
)

export default IngredientesSeleccionados