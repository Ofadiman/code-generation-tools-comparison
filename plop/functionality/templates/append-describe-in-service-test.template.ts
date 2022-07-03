export default `  describe('{{ camelCase name }}', () => {
    it('should handle execution', async () => {
      const {{ camelCase name }}Args: MethodArgs<typeof {{ pascalCase module }}Service, '{{ camelCase name }}'> = {}

      const result = await execute(async () => {
        return {{ module }}Service.{{ camelCase name }}({{ camelCase name }}Args)
      })

      expect(result.data).toMatchSnapshot()
    })
  })
`
