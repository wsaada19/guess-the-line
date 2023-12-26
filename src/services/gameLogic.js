export const getScoreFromGuess = (guess, actual) => {
  const difference = Math.abs(guess - actual)
  if (difference === 0) {
    return 10
  } else if (difference <= 1) {
    return 7
  } else if (difference <= 2) {
    return 5
  } else if (difference <= 3) {
    return 3
  } else if (difference <= 4) {
    return 2
  } else if (difference <= 5) {
    return 1
  } else {
    return 0
  }
}
