type ExecuteSuccess<Data> = { data: Data; error: null }

type ExecuteFailure<Error = unknown> = { data: null; error: Error }

export const execute = async <Data, Error>(
  callback: () => Promise<Data>,
): Promise<ExecuteSuccess<Data> | ExecuteFailure<Error>> => {
  let data: Data | null = null
  let error: unknown | null = null

  try {
    data = await callback()
  } catch (e) {
    error = e
  }

  const isSuccessfulCall = data !== null
  if (isSuccessfulCall) {
    return { data, error: null } as ExecuteSuccess<Data>
  }

  return { data: null, error } as ExecuteFailure<Error>
}
