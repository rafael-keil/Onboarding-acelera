const normalize = (value: string): string => value.trim().toLowerCase()

const normalizeField = (value: unknown): unknown => {
  if (typeof value !== 'string') return value

  return normalize(value)
}

export { normalize, normalizeField }
