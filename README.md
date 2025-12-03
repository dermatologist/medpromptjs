# medpromptjs

A set of base classes for making GenAI application development easy. Implements the [LLM-in-the-Loop CQL execution on unstructured data](https://nuchange.ca/2025/06/v-llm-in-the-loop-cql-execution-with-unstructured-data-and-fhir-terminology-support.html).

[![npm version](https://badge.fury.io/js/medpromptjs.svg)](https://www.npmjs.com/package/medpromptjs)
[![npm](https://img.shields.io/npm/dt/medpromptjs)](https://www.npmjs.com/package/medpromptjs)
[![Build](https://github.com/dermatologist/medpromptjs/workflows/CI/badge.svg)](https://nuchange.ca)
[![codecov](https://codecov.io/gh/dermatologist/medpromptjs/branch/develop/graph/badge.svg)](https://codecov.io/gh/dermatologist/medpromptjs)
[![Known Vulnerabilities](https://snyk.io/test/github/dermatologist/medpromptjs/badge.svg)](https://www.npmjs.com/package/medpromptjs)
[![Documentation](https://badgen.net/badge/icon/documentation?icon=libraries&label)](https://dermatologist.github.io/medpromptjs/)

## Installation
```
npm i --save medpromptjs
```

## Usage

### BaseLLM

`BaseLLM` is a base class for LLMs that communicate with a remote API. It extends the LangChain `LLM` class and provides configurable parameters for model inference.

```typescript
import { BaseLLM } from 'medpromptjs';

const llm = new BaseLLM({
  baseUrl: 'http://localhost:8080/api/chat',
  model: 'llama2',
  apiKey: 'your-api-key', // optional
  temperature: 0.1,
  maxOutputTokens: 512,
});

const response = await llm.invoke('Hello, how are you?');
```

### BaseEmbedding

`BaseEmbedding` is a base class for embeddings that communicate with a remote API. It extends the LangChain `Embeddings` class.

```typescript
import { BaseEmbedding } from 'medpromptjs';

const embedding = new BaseEmbedding({
  baseUrl: 'http://localhost:8080/api/embeddings',
  model: 'nomic-embed-text',
  apiKey: 'your-api-key', // optional
});

// Embed multiple documents
const embeddings = await embedding.embedDocuments(['doc1', 'doc2']);

// Embed a single query
const queryEmbedding = await embedding.embedQuery('search query');
```

## Give us a star ⭐️
If you find this project useful, give us a star. It helps others discover the project.

## Related projects

* [FHIRy - FHIR to pandas dataframe](https://github.com/dermatologist/fhiry)
* [kedro-multimodal - Template for multi-modal machine learning in healthcare using Kedro](https://github.com/dermatologist/kedro-multimodal)
* [ckblib - A library for clinical knowledge graphs](https://github.com/dermatologist/ckblib)

## Contributing
* PR welcome

## Contributers
* [Bell Eapen](https://nuchange.ca) | [![Twitter Follow](https://img.shields.io/twitter/follow/beapen?style=social)](https://twitter.com/beapen)
* [My Blog post](https://nuchange.ca/2025/06/v-llm-in-the-loop-cql-execution-with-unstructured-data-and-fhir-terminology-support.html)
