export const getSafetyNumber = (number: string | number): number => {
  if (number !== 0 && !number) {
    return isNaN(+number) ? 0 : +number
  }

  return +number
}
