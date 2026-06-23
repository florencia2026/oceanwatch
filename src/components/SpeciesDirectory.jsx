import PropTypes from 'prop-types';
import SpeciesCard from './SpeciesCard';

function SpeciesDirectory({ species, onSave, savedSpecies = [], showSaveButton = true, onRemove }) {
  if (!species || species.length === 0) {
    return <p>No se encontraron especies marinas.</p>;
  }

  return (
    <section>
      <h2>Directorio de especies</h2>
      <div className="species-directory">
        {species.map((item) => {
          const isSaved = savedSpecies.some((saved) => saved.id === item.id);
          return (
            <SpeciesCard
              key={item.id}
              name={item.name || item.commonName}
              scientificName={item.scientificName}
              depth={item.depth || item.recommendedDepth}
              conservationStatus={item.conservationStatus}
              habitat={item.habitat}
              diet={item.diet}
              imageUrl={item.imageUrl}
              onSave={showSaveButton ? () => onSave?.(item) : undefined}
              onRemove={onRemove ? () => onRemove(item.id) : undefined}
              isSaved={isSaved}
            />
          );
        })}
      </div>
    </section>
  );
}

SpeciesDirectory.propTypes = {
  species: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      scientificName: PropTypes.string.isRequired,
      depth: PropTypes.string.isRequired,
      conservationStatus: PropTypes.string,
      habitat: PropTypes.string,
      diet: PropTypes.string,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSave: PropTypes.func,
  onRemove: PropTypes.func,
  savedSpecies: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired })
  ),
  showSaveButton: PropTypes.bool,
};

export default SpeciesDirectory;
