import React from 'react'

interface SelectorIngredientesProps {
  licor: string
  ingredientes: string[]
  setIngredientes: (ingredientes: string[]) => void
}

const opcionesGenerales = ['limón', 'sal', 'azúcar', 'hielo']
const opcionesRon = [
  'Jugo de limon',
  'Menta',
  'Azucar moreno',
  'Jarabe simple',
  'Soda',
  'Agua con gas',
  'Jugo de piña',
  'Jugo de naranja',
  'Coca-Cola',
  'Agua de coco',
  'Angostura',
  'Hielo',
]

const opcionesTequila = [
  'Jugo de limon',
  'Triple sec',
  'Sal',
  'Miel',
  'Jugo de naranja',
  'Jarabe de agave',
  'Refresco de toronja',
  'Sangrita',
  'Hielo',
]

const opcionesWhisky = [
  'Vermouth Dulce',
  'Angostura',
  'Azucar',
  'Soda',
  'Huevo',
  'Miel',
]

const opcionesVodka = [
    'Jugo de arándano',
    'Jugo de naranja',
    'Jugo de limon',
    'Azucar',
    'Jarabe Simple',
    'Soda',
    'Tónica',
    'Menta',
    'Jarabe de granadina',
    'Hielo',
]

const opcionesGinebra = [
    'Jugo de limon',
    'Tónica',
    'Romero',
    'Menta',
    'Jugo de arándano',
    'Jugo de naranja',
    'Lavanda',
    'Hielo',
]

const opcionesVermouth = [
    'Soda',
    'Agua con gas',
    'Limon',
]

const SelectorIngredientes: React.FC<SelectorIngredientesProps> = ({ licor, ingredientes, setIngredientes }) => {
  const opciones =
        licor === 'Ron'
        ? opcionesRon
        : licor === 'Tequila'
        ? opcionesTequila
        : licor === 'Whisky'
        ? opcionesWhisky
        : licor === 'Vodka'
        ? opcionesVodka
        : licor === 'Ginebra'
        ? opcionesGinebra
        : licor === 'Vermouth'
        ? opcionesVermouth
        : opcionesGenerales

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