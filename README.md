# <img src="https://github.com/dermatologist/medprompt/blob/develop/images/medprompt_m_small.png" width="32" height="32">EDPrompt

## *Prompts, tools, chains and agents* for healthcare using *LLMs & FHIR*.  ✍️

# MEDPrompt (Javascript version) - WIP

## About
**MEDPrompt** is a collection of prompts, tools, chains  and agents for medical applications using [LangChain](https://www.langchain.com/) and *space* using [Agency](https://github.com/operand/agency). **MEDPrompt also includes a collection of templates for using FHIR in LLM prompts (see below).** The aim of MEDPrompt is to provide a conceptual framework and a set of tools for building healthcare applications using LLMs. [Please read my Blog post](https://nuchange.ca/2023/12/medprompt-how-to-architect-llm-solutions-for-healthcare.html). User contributions are highly appreciated!

## Terminology
* **Prompts** are inputs or queries to LLMs that users can provide to elicit specific responses from a Large Language Model (LLM). Example: [*You are an AI assistant. Summarize this clinical document in 250 words*](src/medprompt/templates/summary_v1.jinja)
* **Tools** are functions used by *agents* for getting things done. Example: [To find patient ID from name.](src/medprompt/tools/find_patient.py)
* **Chains** are tools that use LLM calls to get things done. Example: [Answer a clinical question based on patient health record using RAG](src/medprompt/chains/rag_chain.py)
* **Agents** use LLMs to orchestrate Chains and Tools to acheive the overarching goal. Example: [Answer a doctors question related to a patient. Find patient, get health record, generate embedding and generate answer](src/medprompt/agents/fhir_agent.py)
* **Space** is an [Agency](https://github.com/operand/agency) based abstraction for an environment for agents to communicate according to the [actor model](https://en.wikipedia.org/wiki/Actor_model). Example: [FHIR space](examples/example_space_gradio.py)

### Architecture
[![Architecture](https://github.com/dermatologist/medprompt/blob/develop/notes/arch.drawio.svg)](https://github.com/dermatologist/medprompt/blob/develop/notes/arch.drawio.svg)

### Example
[![Agent](https://github.com/dermatologist/medprompt/blob/develop/notes/agent.drawio.svg)](https://github.com/dermatologist/medprompt/blob/develop/notes/agent.drawio.svg)


### Design principles (WIP)
* **Decoupled** - Each component is independent of the other with [dependencies injected](src/medprompt/bootstrap.py).
* **LLM agnostic** - Each component can use any LLM. LLMs are [injected into chains and agents](src/medprompt/bootstrap.py).
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