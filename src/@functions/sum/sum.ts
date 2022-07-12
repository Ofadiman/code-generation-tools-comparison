export type SumArgs = {
  values: number[]
}

export type SumResult = {
  value: number
}

export const sum = (args: SumArgs): SumResult => {
  return args.values.reduce(
    (acc, value) => {
      return {
        value: acc.value + value,
      }
    },
    { value: 0 },
  )
}
