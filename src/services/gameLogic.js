export const getScoreFromGuess = (guess, actual) => {
  const difference = Math.abs(guess - actual)
  if (difference === 0) {
    return 15
  } else if (difference <= 1.5) {
    return 10
  } else if (difference <= 3) {
    return 7
  } else if (difference <= 5) {
    return 5
  } else if (difference <= 6) {
    return 2
  } else if (difference <= 7) {
    return 1
  } else {
    return 0
  }
}
