import { sum } from './sum'

describe('sum function', () => {
  it('should sum values', () => {
    const result = sum({ values: [1, 2, 3] })

    expect(result.value).toBe(6)
  })
})
