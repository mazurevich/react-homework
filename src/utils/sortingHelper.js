export function createSortingFunc(field) {
  return (m1, m2) => {
    const value1 = m1[field]
    const value2 = m2[field]
    if (value1 < value2) return -1
    if (value2 < value1) return 1
    return 0
  }
}
