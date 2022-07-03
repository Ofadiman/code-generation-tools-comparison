export default `
  @{{ method }}('{{ path }}')
  public async {{ camelCase name }}(@Body() body: {{ pascalCase module }}Controller{{ pascalCase name }}RequestBodyDto): Promise<{{ pascalCase module }}Controller{{ pascalCase name }}ResponseBodyDto> {
    return this.{{ camelCase module }}Service.{{ camelCase name }}(body)
  }`
