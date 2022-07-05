---
to: src/<%= module %>/<%= module %>.service.ts
inject: true
after: "\\) {}"
---
<%= %>
  public async <%= h.changeCase.camelCase(name) %>(args: {}) {
    return {}
  }-%>
