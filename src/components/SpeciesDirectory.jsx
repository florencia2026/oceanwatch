import PropTypes from 'prop-types';
import SpeciesCard from './SpeciesCard';

function SpeciesDirectory({ species }) {
  if (!species || species.length === 0) {
    return <p>No se encontraron especies marinas.</p>;
  }

  return (
    <section>
      <h2>Directorio de especies</h2>
      <div className="species-directory">
        {species.map((item) => (
          <SpeciesCard
            key={item.id}
            commonName={item.commonName}
            scientificName={item.scientificName}
            recommendedDepth={item.recommendedDepth}
            researchZone={item.researchZone}
          />
        ))}
      </div>
    </section>
  );
}

SpeciesDirectory.propTypes = {
  species: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      commonName: PropTypes.string.isRequired,
      scientificName: PropTypes.string.isRequired,
      recommendedDepth: PropTypes.string.isRequired,
      researchZone: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SpeciesDirectory;
