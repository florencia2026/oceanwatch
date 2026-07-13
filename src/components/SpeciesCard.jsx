import './SpeciesCard.css';

function SpeciesCard({
  name,
  scientificName,
  depth,
  conservationStatus,
  habitat,
  diet,
  imageUrl,
  onSave,
  onRemove,
  isSaved,
}) {
  let statusColor = '#5b6b72';
  if (conservationStatus === 'En peligro') {
    statusColor = '#d72631';
  } else if (conservationStatus === 'Preocupación menor') {
    statusColor = '#2a9d8f';
  }

  return (
    <article className={`species-card ${isSaved ? 'species-card--saved' : ''}`}>
      <img className="species-card__image" src={`/${imageUrl}`} alt={name} />
      <h3>{name}</h3>
      {isSaved && <div className="species-card__seen">✅ Especie vista</div>}
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
          <span className="button-icon" aria-hidden="true">💾</span>{' '}
          {isSaved ? '✔️ Guardada en mi bitácora' : 'Guardar en mi bitácora'}
        </button>
      )}
      {onRemove && (
        <button
          type="button"
          className="species-card__remove-button"
          onClick={onRemove}
        >
          <span className="button-icon" aria-hidden="true">❌</span>{' '}
          Quitar de mi bitácora
        </button>
      )}
    </article>
  );
}

export default SpeciesCard;
