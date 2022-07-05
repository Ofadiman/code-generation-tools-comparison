---
to: src/<%= module %>/<%= module %>.controller.integration.spec.ts
inject: true
after: "describe"
---
  describe('<%= h.inflection.capitalize(h.changeCase.noCase(name)) %>', () => {
    it('should handle request', async () => {
      const body: UsersController<%= h.changeCase.pascalCase(name) %>RequestBodyDto = {}

      const response = await supertest(nestApplication.getHttpServer())
        .get('/users/<%= name %>')
        .send(body)

      expect(response.status).toBe(HttpStatus.OK)
    })
  })
