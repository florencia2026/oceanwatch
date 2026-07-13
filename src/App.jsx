import { useState, useEffect } from 'react';
import './App.css';
import SpeciesDirectory from './components/SpeciesDirectory';

// Mapeo de imágenes locales para usar con datos de API
const imageUrls = [
  'tonina.jpg',
  'lobomarinodeunpelo.jpg',
  'centolla.jpg',
  'puye.jpg',
  'erizolapiz.jpg',
  'merluzaaustral.jpg',
  'congriodorado.jpg',
  'mejillonchileno.jpg',
  'jurel.jpg',
];

// Nombres de especies marinas chilenas con nombres científicos (10 especies únicas)
const speciesNames = [
  { name: 'Tonina', scientificName: 'Tursiops truncatus' },
  { name: 'Lobo marino de un pelo', scientificName: 'Otaria byronia' },
  { name: 'Centolla', scientificName: 'Lithodes santolla' },
  { name: 'Puyé', scientificName: 'Galaxias maculatus' },
  { name: 'Erizo lápiz', scientificName: 'Tetrapygus niger' },
  { name: 'Merluza austral', scientificName: 'Merluccius australis' },
  { name: 'Congrio dorado', scientificName: 'Genypterus blacodes' },
  { name: 'Mejillón chileno', scientificName: 'Mytilus chilensis' },
  { name: 'Jurel', scientificName: 'Trachurus murphyi' },
];

// Especies adicionales cuyas fotos (nombradas igual que el animal) están en /public
const additionalSpecies = [
  {
    name: 'Huiche',
    scientificName: 'Xystreurys rasile',
    depth: '10-100 m',
    conservationStatus: 'Preocupación Menor',
    habitat: 'Fondos arenosos de plataforma continental',
    diet: 'Peces y crustáceos (carnívoro)',
    imageUrl: 'huiche.jpg',
  },
  {
    name: 'Picoroco',
    scientificName: 'Megabalanus psittacus',
    depth: 'Intermareal - submareal',
    conservationStatus: 'Preocupación Menor',
    habitat: 'Costas rocosas expuestas',
    diet: 'Filtrador (plancton)',
    imageUrl: 'picoroco.jpg',
  },
];

// Datos de referencia para enriquecer los datos de la API
const speciesMetadata = [
  { depth: '0-50 m', conservationStatus: 'Casi Amenazado', habitat: 'Aguas costeras, bahías y canales', diet: 'Peces, calamares (carnívoro)' },
  { depth: '0-30 m', conservationStatus: 'Preocupación Menor', habitat: 'Costas rocosas, bosques de algas', diet: 'Peces, crustáceos (carnívoro)' },
  { depth: '20-200 m', conservationStatus: 'Datos Insuficientes', habitat: 'Benónico, sedimentos blandos y fondos rocosos', diet: 'Carroñero / omnívoro' },
  { depth: '0-5 m', conservationStatus: 'Preocupación Menor', habitat: 'Estuarios, arroyos, lagunas costeras', diet: 'Insectos, pequeños invertebrados (omnívoro)' },
  { depth: '0-30 m', conservationStatus: 'Preocupación Menor', habitat: 'Zona intermareal y submareal rocosa', diet: 'Herbívoro (algas y kelp)' },
  { depth: '50-500 m', conservationStatus: 'Casi Amenazado', habitat: 'Demersal, plataforma continental y talud', diet: 'Peces y crustáceos (carnívoro)' },
  { depth: '50-700 m', conservationStatus: 'Preocupación Menor', habitat: 'Benónico, fondos blandos y afloramientos rocosos', diet: 'Peces y cefalópodos (carnívoro)' },
  { depth: 'Intermareal - submareal somero', conservationStatus: 'Preocupación Menor', habitat: 'Costas rocosas y lechos de mejillones', diet: 'Filtrador (plancton)' },
];

// Función de validación para la búsqueda
const isValidSearchInput = (input) => {
  // Permitir cadena vacía para poder limpiar el filtro
  if (input === '') {
    return true;
  }
  // Rechazar búsquedas vacías (solo espacios) o con caracteres especiales prohibidos.
  // Permitir solo letras, números, espacios, guiones y apóstrofes.
  const validPattern = /^[a-zA-Z0-9\s\-'áéíóúñüÁÉÍÓÚÑÜ]+$/;
  return validPattern.test(input);
};

function App() {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [searchError, setSearchError] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentView, setCurrentView] = useState('catalog');
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

  // Fetch datos desde API externa
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transformar datos de la API al formato de especies con nombres chilenos
        // (limitamos a la cantidad de especies únicas para evitar repeticiones)
        const transformedSpecies = data
          .slice(0, speciesNames.length)
          .map((user, index) => {
          const speciesInfo = speciesNames[index];
          return {
            id: user.id,
            name: speciesInfo.name,
            scientificName: speciesInfo.scientificName,
            depth: speciesMetadata[index % speciesMetadata.length].depth,
            conservationStatus: speciesMetadata[index % speciesMetadata.length].conservationStatus,
            habitat: speciesMetadata[index % speciesMetadata.length].habitat,
            diet: speciesMetadata[index % speciesMetadata.length].diet,
            imageUrl: imageUrls[index % imageUrls.length],
          };
        });
        
        const extraSpecies = additionalSpecies.map((species, index) => ({
          ...species,
          id: `static-${index}`,
        }));

        setSpecies([...transformedSpecies, ...extraSpecies]);
        setError(null);
      } catch (err) {
        console.error('Error fetching species:', err);
        setError(err.message);
        setSpecies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, []);

  // Guardar especies en localStorage
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

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;

    // Validar que el input sea válido:
    // - no puede estar vacío (solo espacios)
    // - no se permiten caracteres especiales prohibidos
    if (inputValue !== '' && !isValidSearchInput(inputValue)) {
      setSearchError(
        '❌ No se permiten caracteres especiales. Solo letras, números, espacios, guiones y apóstrofes.'
      );
      return;
    }

    // Validar búsquedas vacías (solo espacios en blanco)
    if (inputValue.trim() === '' && inputValue !== '') {
      setSearchError('❌ La búsqueda no puede estar vacía.');
      return;
    }

    setFilterName(inputValue);
    setSearchError(''); // Limpiar error si el input es válido
  };

  const handleSaveSpecies = (speciesToSave) => {
    setSavedSpecies((current) => {
      if (current.some((item) => item.id === speciesToSave.id)) {
        return current;
      }
      return [...current, speciesToSave];
    });
  };

  const handleRemoveSpecies = (id) => {
    setSavedSpecies((current) => current.filter((s) => s.id !== id));
  };

  const handleAddSpecies = () => {
    const newSpecies = {
      id: Date.now().toString(),
      name: `Especie ${savedSpecies.length + 1}`,
      scientificName: 'Desconocida',
      depth: '0-50 m',
      conservationStatus: 'Preocupación Menor',
      habitat: 'Hábitat desconocido',
      diet: 'Desconocido',
      imageUrl: 'tonina.jpg',
    };

    setSavedSpecies((current) => [...current, newSpecies]);
  }

  return (
    <div className="app-container">
      <h1>OceanWatch</h1>
      <nav className="top-nav">
        <button
          type="button"
          className={currentView === 'catalog' ? 'active' : ''}
          onClick={() => setCurrentView('catalog')}
        >
          <span className="button-icon" aria-hidden="true">📘</span>{' '}
          Catálogo
        </button>
        <button
          type="button"
          className={currentView === 'bitacora' ? 'active' : ''}
          onClick={() => setCurrentView('bitacora')}
        >
          <span className="button-icon" aria-hidden="true">📝</span>{' '}
          Mi Bitácora
        </button>
      </nav>

      {currentView === 'catalog' ? (
        <>
          {loading && (
            <section className="loading-message">
              <p>⏳ Cargando especies desde la API...</p>
            </section>
          )}
          
          {error && (
            <section className="error-message">
              <p>❌ Error al cargar las especies: {error}</p>
            </section>
          )}
          
          {!loading && !error && (
            <>
              <section className="search-section">
                <label htmlFor="species-filter">🔍 Filtrar por nombre:</label>
                <input
                  id="species-filter"
                  type="text"
                  value={filterName}
                  onChange={handleSearchChange}
                  placeholder="Ej. Tonina, Centolla..."
                  aria-describedby="search-error"
                />
                {searchError && (
                  <p id="search-error" className="search-error-message">
                    {searchError}
                  </p>
                )}
              </section>

              {sortedSpecies.length === 0 && filterName.trim() !== '' && (
                <section className="no-results-message">
                  <p>No se encontraron especies con ese nombre</p>
                </section>
              )}

              <div className="ticks"></div>

              <section id="saved-species">
                <div>
                  <h2>Especies guardadas</h2>
                  <button type="button" onClick={handleAddSpecies}>
                    Agregar especie de ejemplo
                  </button>
                  {savedSpecies.length === 0 ? (
                    <p>No hay especies guardadas.</p>
                  ) : (
                    <ul>
                      {savedSpecies.map((species) => (
                        <li key={species.id}>
                          <strong>{species.name}</strong> ({species.scientificName})
                          <button type="button" onClick={() => handleRemoveSpecies(species.id)}>
                            Eliminar
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
            </>
          )}
        </>
      ) : (
        <section className="saved-species">
          <h2>Mi Bitácora</h2>
          {savedSpecies.length === 0 ? (
            <p>No has guardado especies aún.</p>
          ) : (
              <SpeciesDirectory species={savedSpecies} showSaveButton={false} onRemove={handleRemoveSpecies} savedSpecies={savedSpecies} />
            )}
        </section>
      )}
    </div>
  );
}

export default App;