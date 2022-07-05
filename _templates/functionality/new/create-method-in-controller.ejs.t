---
to: src/<%= module %>/<%= module %>.controller.ts
inject: true
after: "\\) {}"
---
<%= %>
  @Get('<%= name %>')
  public async <%= h.changeCase.camelCase(name) %>(@Body() body: UsersController<%= h.changeCase.pascalCase(name) %>RequestBodyDto): Promise<UsersController<%= h.changeCase.pascalCase(name) %>ResponseBodyDto> {
    return this.usersService.<%= h.changeCase.camelCase(name) %>(body)
  }-%>
