import React from 'react'

interface SelectorMarcaLicorProps {
  licor: string
  marca: string
  setMarca: (marca: string) => void
}

const marcasPorLicor: Record<string, string[]> = {
  Tequila: ['Don Julio', 'Patrón', 'Jose Cuervo', 'Karnal'],
  Ron: ['Bacardí', 'Havana Club', 'Flor de Caña'],
  Vodka: ['Absolut', 'Smirnoff', 'Grey Goose'],
  Whisky: ['Johnnie Walker', 'Jack Daniels', 'Chivas Regal'],
  Ginebra: ['Beefeater', 'Bombay Sapphire', 'Tanqueray'],
  Vermouth: ['Martini', 'Cinzano', 'Noilly Prat'],
}

const imagenesMarcas: Record<string, string> = {
  'Don Julio': '/marcas/don-julio.jpeg',
  'Patrón': '/marcas/patron.jpeg',
  'Jose Cuervo': '/marcas/jose-cuervo.jpeg',
  'Bacardí': '/marcas/bacardi.jpeg',
  'Havana Club': '/marcas/havana-club.jpeg',
  'Flor de Caña': '/marcas/flor-de-caña.jpeg',
  'Absolut' : '/marcas/absolut.jpeg',
  'Smirnoff' : '/marcas/smirnoff.jpeg',
  'Grey Goose' : '/marcas/grey-goose.jpeg',
  'Johnnie Walker' : '/marcas/johnnie-walker.jpeg',
  'Jack Daniels' : '/marcas/jack-daniels.jpeg',
  'Chivas Regal' : '/marcas/chivas-regal.jpeg',
  'Beefeater' : '/marcas/beefeater.jpeg',
  'Bombay Sapphire' : '/marcas/bombay-sapphire.jpeg',
  'Tanqueray' : '/marcas/tanqueray.jpeg',
  'Martini' : '/marcas/martini.jpeg',
  'Cinzano' : '/marcas/cinzano.jpeg',
  'Noilly Prat' : '/marcas/noilly-prat.jpeg',
  'Karnal' : '/marcas/karnal.jpeg'
}

const SelectorMarcaLicor: React.FC<SelectorMarcaLicorProps> = ({ licor, marca, setMarca }) => {
  const marcas = marcasPorLicor[licor] || []

  return (
    <div className="selector-marca-licor-tarjetas">
      {marcas.map(m => (
        <div
          key={m}
          className={`tarjeta-marca-licor${marca === m ? ' seleccionada' : ''}`}
          onClick={() => setMarca(m)}
        >
          <div className="marca-imagen-card">
            <div className="marca-imagen">
              <img src={imagenesMarcas[m]} alt={m} />
            </div>
          </div>
          <div className="marca-titulo">{m}</div>
        </div>
      ))}
    </div>
  )
}

export default SelectorMarcaLicor