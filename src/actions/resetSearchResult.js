export const RESET_SEARCH_RESULT = 'RESET_SEARCH_RESULT'

export function resetSearchResult() {
  return {
    type: RESET_SEARCH_RESULT,
    payload: true,
  }
}
