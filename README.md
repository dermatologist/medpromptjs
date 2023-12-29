# <img src="https://github.com/dermatologist/medprompt/blob/develop/images/medprompt_m_small.png" width="32" height="32">EDPromptJS

## *Prompts, tools, chains and agents* for healthcare using *LLMs & FHIR*.  ✍️

# MEDPromptJS (Javascript version) - WIP

## About
**MEDPromptJS** is a collection of prompts, tools, chains  and agents for medical applications using [LangChain](https://www.langchain.com/) and *space* using [Agency](https://github.com/operand/agency). **MEDPrompt also includes a collection of templates for using FHIR in LLM prompts (see below).** The aim of MEDPrompt is to provide a conceptual framework and a set of tools for building healthcare applications using LLMs. [Please read my Blog post](https://nuchange.ca/2023/12/medprompt-how-to-architect-llm-solutions-for-healthcare.html). User contributions are highly appreciated!


### Architecture
[![Architecture](https://github.com/dermatologist/medprompt/blob/develop/notes/arch.drawio.svg)](https://github.com/dermatologist/medprompt/blob/develop/notes/arch.drawio.svg)

### Example
[![Agent](https://github.com/dermatologist/medprompt/blob/develop/notes/agent.drawio.svg)](https://github.com/dermatologist/medprompt/blob/develop/notes/agent.drawio.svg)


### Design principles (WIP)
* **Decoupled** - Each component is independent of the other with dependencies injected.
* **LLM agnostic** - Each component can use any LLM. LLMs are injected into chains and agents.
* **No Permanent vector storage** - No permanent storage of vectors. Vectors are generated on the fly.
* **Fail silently** - Each component should fail silently and log errors.
* **Returns** - Each component should return a LLM friendly message.
* **Modular** - Each component is a separate module that can be used independently.
* **Extensible** - New tools, chains and agents can be added easily.
* **Reusable** - Tools, chains and agents can be reused in different contexts.
* **Testable** - Each component can be tested independently.
* **Documented** - Each component is documented with examples.
* **Open** - Open source and open to contributions.

#### Disclaimer:
*This repository is not associated with the [Medprompt method of prompting](https://arxiv.org/pdf/2311.16452.pdf). In this generic repository, [I](https://nuchange.ca) will be trying to implement the method using langchain abstractions. Get in touch to share your thoughts via [GitHub discussions](https://github.com/dermatologist/medprompt/discussions). Please submit a PR with a link to the official implementation if any.*

## Give us a star ⭐️
If you find this project useful, give us a star. It helps others discover the project.

## Related projects

* [MEDprompt](https://github.com/dermatologist/medprompt)
* [FHIRy - FHIR to pandas dataframe](https://github.com/dermatologist/fhiry)
* [kedro-multimodal - Template for multi-modal machine learning in healthcare using Kedro](https://github.com/dermatologist/kedro-multimodal)
* [ckblib - A library for clinical knowledge graphs](https://github.com/dermatologist/ckblib)

## Contributing
* PR welcome


## Contributers
* [Bell Eapen](https://nuchange.ca) | [![Twitter Follow](https://img.shields.io/twitter/follow/beapen?style=social)](https://twitter.com/beapen)
* [My Blog post](https://nuchange.ca/2023/12/medprompt-how-to-architect-llm-solutions-for-healthcare.html)