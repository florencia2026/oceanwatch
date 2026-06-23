import { useState } from 'react';
import SpeciesDirectory from './components/SpeciesDirectory';

const initialSpecies = [
  {
    id: 1,
    commonName: 'Tortuga carey',
    scientificName: 'Eretmochelys imbricata',
    recommendedDepth: '5-12 m',
    researchZone: 'Costa Caribe - sector de anidación',
  },
  {
    id: 2,
    commonName: 'Delfín nariz de botella',
    scientificName: 'Tursiops truncatus',
    recommendedDepth: '3-15 m',
    researchZone: 'Bahía de Cartagena - corredores de pesca',
  },
  {
    id: 3,
    commonName: 'Margarita de mar',
    scientificName: 'Euthria mariana',
    recommendedDepth: '8-18 m',
    researchZone: 'Arrecifes del Pacífico - monitoreo coralino',
  },
];

function App() {
  const [species] = useState(initialSpecies);
  const [filterName, setFilterName] = useState('');

  const filteredSpecies = species.filter((item) =>
    item.commonName.toLowerCase().includes(filterName.trim().toLowerCase())
  );

  return (
    <div>
      <h1>OceanWatch</h1>
      <section>
        <label htmlFor="species-filter">Filtrar por nombre:</label>
        <input
          id="species-filter"
          type="text"
          value={filterName}
          onChange={(event) => setFilterName(event.target.value)}
          placeholder="Ej. Tortuga carey"
        />
      </section>
      <SpeciesDirectory species={filteredSpecies} />
    </div>
  );
}

export default App;