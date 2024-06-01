/* eslint-disable @typescript-eslint/no-explicit-any */
// Helper function to update nested state
export const setNestedState = (prevState: any, keys: string[], value: any): any => {
  try {
    if (keys.length === 0) {
      return value
    }

    const [firstKey, ...restKeys] = keys
    return {
      ...prevState,
      [firstKey]: setNestedState(prevState[firstKey] || {}, restKeys, value),
    }
  } catch (error) {
    console.log(error)
  }
}
