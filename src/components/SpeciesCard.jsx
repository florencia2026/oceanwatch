import PropTypes from 'prop-types';

function SpeciesCard({ commonName, scientificName, recommendedDepth, researchZone }) {
  return (
    <article className="species-card">
      <h3>{commonName}</h3>
      <p>
        <strong>Nombre científico:</strong> {scientificName}
      </p>
      <p>
        <strong>Profundidad recomendada:</strong> {recommendedDepth}
      </p>
      <p>
        <strong>Zona de investigación:</strong> {researchZone}
      </p>
    </article>
  );
}

SpeciesCard.propTypes = {
  commonName: PropTypes.string.isRequired,
  scientificName: PropTypes.string.isRequired,
  recommendedDepth: PropTypes.string.isRequired,
  researchZone: PropTypes.string.isRequired,
};

export default SpeciesCard;
