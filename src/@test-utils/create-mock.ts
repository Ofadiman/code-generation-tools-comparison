export const createMock = (name: string): jest.Mock => {
  return jest.fn().mockName(name)
}
