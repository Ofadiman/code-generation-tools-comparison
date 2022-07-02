# Code generation tools comparison

This project aims to compare popular code generation tools in order to choose the tool that will be most optimal to reduce the amount of manual work needed during project development to create necessary files.

# What to expect from a code generation tool?

I have a few minimum requirements to consider when choosing a code generation tool:

1. The tool should allow to generate code from a template file.
2. The tool should allow to generate multiple files at once (e.g., `users.controller.ts`, `users.service.ts`, `users.repository.ts`).
3. The tool should allow to configure the output file names (e.g., `users.controller.ts`, `UsersController.ts`).
4. The tool should allow to configure the output file paths (e.g., `src/users/<filename>`, `src/users/<filename>`, `src/core/<filename>`).

In addition to the minimum requirements, I also have a few requirements that are not essential for a tool to consider, but can be useful when working on a commercial project. "Nice to have" requirements are:

1. The tool should allow to modify existing files. When adding new files, functions or classes in the code, it is often necessary to modify other files in order to e.g. export variable declaration from the `index.ts` file (in the case of building libraries) or provide dependencies to a module (in the case of using dependency injection).
2. The tool should allow to run interactive prompts in the terminal to get user input. Interactive prompts are helpful in the case of, for example, onboarding a new person in a project, or when we do not create new code for a long time, because our work is mainly maintenance, so we forget how to create new code.
3. The tool should allow to configure user input validation (e.g., require input to be `kebab-case`).
4. The tool should allow to transform user input (e.g., convert inputs in `kebab-case` to `PascalCase`).
5. The tool should allow to run arbitrary actions before or after the code generation (e.g., reformat files with prettier, apply eslint formatting rules).
