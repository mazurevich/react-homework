export const SET_LOADING = 'SET_LOADING'

export function setLoading(page, key) {
  return {
    type: SET_LOADING,
    payload: {
      page,
      key,
    },
  }
}
