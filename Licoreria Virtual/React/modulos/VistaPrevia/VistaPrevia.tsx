import React from 'react'
import IngredientesSeleccionados from './IngredientesSeleccionados'
import PosiblesSabores from './PosiblesSabores'
import Recomendaciones from './Recomendaciones'

interface VistaPreviaProps {
  licor: string
  marca: string
  ingredientes: string[]
  frutas: string[]
}

const VistaPrevia: React.FC<VistaPreviaProps> = ({ licor, marca, ingredientes, frutas }) => (
  <div className="vista-previa">
    <h1>Vista Previa del Cóctel</h1>
    <IngredientesSeleccionados licor={licor} marca={marca} ingredientes={ingredientes} frutas={frutas} />
    <PosiblesSabores licor={licor} ingredientes={ingredientes} frutas={frutas} />
    <Recomendaciones licor={licor} ingredientes={ingredientes} frutas={frutas} />
  </div>
)

export default VistaPrevia