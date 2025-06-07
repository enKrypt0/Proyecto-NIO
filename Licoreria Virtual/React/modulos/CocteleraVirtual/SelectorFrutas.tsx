import React from 'react'

interface SelectorFrutasProps {
  licor: string
  frutas: string[]
  setFrutas: (frutas: string[]) => void
}

const opcionesGenerales = ['piña', 'naranja', 'fresa', 'mango']
const opcionesRon = ['Mango', 'Maracuyá']
const opcionesTequila = ['Jalapeño', 'Pepino']
const opcionesWhisky = ['Cereza', 'Naranja', 'Limon', 'Cafe']
const opcionesVodka = ['Frambuesa', 'Fresa', 'Cafe', 'Pepino', 'Limon']
const opcionesGinebra = ['Pepino', 'Limon', 'Fresa', 'Naranja', 'Toronja']
const opcionesVermouth = ['Naranja', 'Aceituna', 'Limon']

const SelectorFrutas: React.FC<SelectorFrutasProps> = ({ licor, frutas, setFrutas }) => {
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