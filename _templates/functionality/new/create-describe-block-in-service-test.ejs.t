---
to: src/<%= module %>/<%= module %>.service.unit.spec.ts
inject: true
after: "describe"
---
  describe('<%= h.changeCase.camelCase(name) %>', () => {
    it('should handle execution', async () => {
      const <%= h.changeCase.camelCase(name) %>Args: MethodArgs<typeof UsersService, '<%= h.changeCase.camelCase(name) %>'> = {}

      const result = await execute(async () => {
        return usersService.<%= h.changeCase.camelCase(name) %>(<%= h.changeCase.camelCase(name) %>Args)
      })

      expect(result.data).toMatchSnapshot()
    })
  })
