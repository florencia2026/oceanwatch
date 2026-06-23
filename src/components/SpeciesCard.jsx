import PropTypes from 'prop-types';

function SpeciesCard({
  name,
  scientificName,
  depth,
  conservationStatus,
  habitat,
  diet,
  imageUrl,
  onSave,
  isSaved,
}) {
  let statusColor = '#5b6b72';
  if (conservationStatus === 'En peligro') {
    statusColor = '#d72631';
  } else if (conservationStatus === 'Preocupación menor') {
    statusColor = '#2a9d8f';
  }

  return (
    <article className="species-card">
      <img className="species-card__image" src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>
        <strong>Nombre científico:</strong> {scientificName}
      </p>
      <p>
        <strong>Profundidad:</strong> {depth}
      </p>
      <p>
        <strong>Estado de conservación:</strong>{' '}
        <span style={{ color: statusColor }}>{conservationStatus || 'Desconocido'}</span>
      </p>
      <p>
        <strong>Hábitat:</strong> {habitat}
      </p>
      <p>
        <strong>Dieta:</strong> {diet}
      </p>
      {onSave && (
        <button
          type="button"
          className="species-card__save-button"
          onClick={onSave}
          disabled={isSaved}
        >
          {isSaved ? 'Guardada en mi bitácora' : 'Guardar en mi bitácora'}
        </button>
      )}
    </article>
  );
}

SpeciesCard.propTypes = {
  name: PropTypes.string.isRequired,
  scientificName: PropTypes.string.isRequired,
  depth: PropTypes.string.isRequired,
  conservationStatus: PropTypes.string,
  habitat: PropTypes.string,
  diet: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  onSave: PropTypes.func,
  isSaved: PropTypes.bool,
};

export default SpeciesCard;
