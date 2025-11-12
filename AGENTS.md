# Agent Instructions

- This typescript repository contains various langchain chains, agents and tools designed to assist with medical prompts and tasks.
- Additionally, it includes UI components for building interfaces around these agents.
- For scaffolding, this repository uses dts-cli from https://github.com/weiran-zsd/dts-cli
- Please read README.md, package.json, and tsconfig.json for more details on setup and usage.
- Dependency injections are managed using tsyringe. Please see src/mydi.ts for details.
- DO NOT use any content from the notes folder.

## Agent development and contribution guidelines.

- Follow the repository structure and coding conventions
- Write tests using jest for new functionality and maintain existing test coverage

## Repository Structure

```
medpromptjs/
├── src/        # Main source code
├── test/                 # Test files
├── docs/                  # Documentation
├── notes/                 # User guides and demos
├── examples/              # Examples and tutorials
└── README.md             # Main readme
└── package.json           # NPM package configuration
└── tsconfig.json         # TypeScript configuration
```

Key files you should familiarize yourself with:
- README.md - Main documentation
