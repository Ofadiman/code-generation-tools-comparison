export const execute = async <Data>(
  callback: () => Promise<Data>,
): Promise<{ data: Data; error: null } | { data: null; error: unknown }> => {
  let data: Data | null = null
  let error: unknown | null = null

  try {
    data = await callback()
  } catch (e) {
    error = e
  }

  const isSuccessfulCall = data !== null
  if (isSuccessfulCall) {
    return { data, error: null }
  }

  return { data: null, error }
}
