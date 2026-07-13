const STORAGE_KEY = 'oceanwatch.savedSpecies'

function parseSavedSpecies(rawValue) {
  try {
    const parsed = JSON.parse(rawValue)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function getSavedSpecies() {
  if (typeof window === 'undefined') {
    return []
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return []
  }

  return parseSavedSpecies(raw)
}

export function saveSpecies(species) {
  const savedSpecies = getSavedSpecies()
  const nextSpecies = savedSpecies.filter((item) => item.id !== species.id)
  nextSpecies.push(species)

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSpecies))
  return nextSpecies
}

export function removeSpecies(id) {
  const savedSpecies = getSavedSpecies()
  const nextSpecies = savedSpecies.filter((item) => item.id !== id)

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSpecies))
  return nextSpecies
}
