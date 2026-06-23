import { useState, useEffect } from 'react';
import SpeciesDirectory from './components/SpeciesDirectory';

const initialSpecies = [
  {
    id: 1,
    name: 'Tonina (Delfín chileno)',
    scientificName: 'Cephalorhynchus eutropia',
    depth: '0-50 m',
    conservationStatus: 'Near Threatened',
    habitat: 'Coastal waters, bays and channels',
    diet: 'Fish, squid (carnivore)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Chilean_dolphin.jpg',
  },
  {
    id: 2,
    name: 'Lobo marino de un pelo',
    scientificName: 'Otaria flavescens',
    depth: '0-30 m',
    conservationStatus: 'Least Concern',
    habitat: 'Rocky shores, kelp beds',
    diet: 'Fish, crustaceans (carnivore)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Sea_lion_chile.jpg',
  },
  {
    id: 3,
    name: 'Centolla',
    scientificName: 'Lithodes santolla',
    depth: '20-200 m',
    conservationStatus: 'Data Deficient',
    habitat: 'Benthic, soft sediment and rocky bottoms',
    diet: 'Scavenger / omnivore',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/South_American_king_crab_%28Lithodes_santolla%29.jpg',
  },
  {
    id: 4,
    name: 'Puye',
    scientificName: 'Galaxias maculatus',
    depth: '0-5 m',
    conservationStatus: 'Least Concern',
    habitat: 'Estuaries, streams, coastal lagoons',
    diet: 'Insects, small invertebrates (omnivore)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Galaxias_maculatus_%28juvenile%29.jpg',
  },
  {
    id: 5,
    name: 'Erizo lápiz',
    scientificName: 'Loxechinus albus',
    depth: '0-30 m',
    conservationStatus: 'Least Concern',
    habitat: 'Rocky intertidal and subtidal',
    diet: 'Herbivore (kelp and algae)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Loxechinus_albus.jpg',
  },
  {
    id: 6,
    name: 'Merluza austral',
    scientificName: 'Merluccius australis',
    depth: '50-500 m',
    conservationStatus: 'Near Threatened',
    habitat: 'Demersal, continental shelf and slope',
    diet: 'Fish and crustaceans (carnivore)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Merluccius_australis.jpg',
  },
  {
    id: 7,
    name: 'Congrio dorado',
    scientificName: 'Genypterus blacodes',
    depth: '50-700 m',
    conservationStatus: 'Least Concern',
    habitat: 'Benthic, soft bottoms and rocky outcrops',
    diet: 'Fish and cephalopods (carnivore)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Ophidiidae_Genypterus_blacodes.JPG',
  },
  {
    id: 8,
    name: 'Mejillón chileno',
    scientificName: 'Mytilus chilensis',
    depth: 'Intertidal - shallow subtidal',
    conservationStatus: 'Least Concern',
    habitat: 'Rocky shores and mussel beds',
    diet: 'Filter feeder (plankton)',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Mytilus_chilensis.jpg',
  },
];

function App() {
  const [species] = useState(initialSpecies);
  const [filterName, setFilterName] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [savedSpecies, setSavedSpecies] = useState(() => {
    if (globalThis?.localStorage === undefined) {
      return [];
    }
    try {
      const raw = globalThis.localStorage.getItem('savedSpecies');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (globalThis?.localStorage === undefined) {
      return;
    }

    try {
      globalThis.localStorage.setItem('savedSpecies', JSON.stringify(savedSpecies));
    } catch {
      // silent fallback if localStorage is unavailable
    }
  }, [savedSpecies]);

  const filteredSpecies = species.filter((item) =>
    (item.name || item.commonName || '')
      .toLowerCase()
      .includes(filterName.trim().toLowerCase())
  );

  const sortedSpecies = [...filteredSpecies].sort((a, b) => {
    if (sortBy === 'depth') {
      const depthA = Number.parseInt(a.depth, 10) || 0;
      const depthB = Number.parseInt(b.depth, 10) || 0;
      return depthA - depthB;
    }

    return (a.name || a.commonName || '').localeCompare(
      b.name || b.commonName || ''
    );
  });

  const handleSaveSpecies = (speciesToSave) => {
    setSavedSpecies((current) => {
      if (current.some((item) => item.id === speciesToSave.id)) {
        return current;
      }
      return [...current, speciesToSave];
    });
  };

  return (
    <div className="app-container">
      <h1>OceanWatch</h1>
      <section>
        <label htmlFor="species-filter">Filtrar por nombre:</label>
        <input
          id="species-filter"
          type="text"
          value={filterName}
          onChange={(event) => setFilterName(event.target.value)}
          placeholder="Ej. Tonina"
        />
      </section>
      <section>
        <label htmlFor="sort-by">Ordenar catálogo:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="name">Ordenar por nombre (A-Z)</option>
          <option value="depth">Ordenar por profundidad</option>
        </select>
      </section>
      <SpeciesDirectory
        species={sortedSpecies}
        onSave={handleSaveSpecies}
        savedSpecies={savedSpecies}
      />
      <section className="saved-species">
        <h2>Especies guardadas</h2>
        {savedSpecies.length === 0 ? (
          <p>No has guardado especies aún.</p>
        ) : (
          <SpeciesDirectory species={savedSpecies} showSaveButton={false} />
        )}
      </section>
    </div>
  );
}

export default App;