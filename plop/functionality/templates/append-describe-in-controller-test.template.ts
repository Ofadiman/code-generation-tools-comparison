export default `  describe('{{ sentenceCase ( lowerCase name ) }}', () => {
    it('should handle request', async () => {
      const body: {{ pascalCase module }}Controller{{ pascalCase name }}RequestBodyDto = {}

      const response = await supertest(nestApplication.getHttpServer())
        .{{ lowerCase method }}('/{{ module }}/{{ path }}')
        .send(body)

      expect(response.status).toBe(HttpStatus.OK)
    })
  })
`
