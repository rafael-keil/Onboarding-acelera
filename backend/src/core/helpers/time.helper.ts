const toSeconds = ({ hours = 0, minutes = 0 }) => {
  return hours * 60 * 60 + minutes * 60
}

const toMilliseconds = ({ hours = 0, minutes = 0 }) => {
  return toSeconds({ hours, minutes }) * 1000
}

const toMinutes = ({ hours = 0, minutes = 0 }) => {
  return hours * 60 + minutes
}

export { toSeconds, toMilliseconds, toMinutes }
