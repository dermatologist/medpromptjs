[**medpromptjs**](../README.md)

***

[medpromptjs](../globals.md) / BaseTool

# Class: BaseTool

Defined in: [src/tool.ts:20](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/tool.ts#L20)

## Extends

- `DynamicStructuredTool`

## Constructors

### Constructor

> **new BaseTool**(`container`, `name`, `description`, `schema`, `func`): `BaseTool`

Defined in: [src/tool.ts:25](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/tool.ts#L25)

#### Parameters

##### container

`any`

##### name

`string`

##### description

`string`

##### schema

`any`

##### func

`any` = `null`

#### Returns

`BaseTool`

#### Overrides

`DynamicStructuredTool.constructor`

## Properties

### callbacks?

> `optional` **callbacks**: `Callbacks`

Defined in: node\_modules/@langchain/core/dist/language\_models/base.d.ts:44

#### Inherited from

`DynamicStructuredTool.callbacks`

***

### container

> **container**: `any`

Defined in: [src/tool.ts:21](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/tool.ts#L21)

***

### description

> **description**: `string`

Defined in: [src/tool.ts:23](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/tool.ts#L23)

#### Overrides

`DynamicStructuredTool.description`

***

### lc\_kwargs

> **lc\_kwargs**: `SerializedFields`

Defined in: node\_modules/@langchain/core/dist/load/serializable.d.ts:27

#### Inherited from

`DynamicStructuredTool.lc_kwargs`

***

### lc\_runnable

> `protected` **lc\_runnable**: `boolean`

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:25

#### Inherited from

`DynamicStructuredTool.lc_runnable`

***

### lc\_serializable

> **lc\_serializable**: `boolean`

Defined in: node\_modules/@langchain/core/dist/load/serializable.d.ts:26

#### Inherited from

`DynamicStructuredTool.lc_serializable`

***

### metadata?

> `optional` **metadata**: `Record`\<`string`, `unknown`\>

Defined in: node\_modules/@langchain/core/dist/language\_models/base.d.ts:46

#### Inherited from

`DynamicStructuredTool.metadata`

***

### name

> **name**: `string`

Defined in: [src/tool.ts:22](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/tool.ts#L22)

#### Overrides

`DynamicStructuredTool.name`

***

### responseFormat?

> `optional` **responseFormat**: `string`

Defined in: node\_modules/@langchain/core/dist/tools/index.d.ts:38

The tool response format.

If "content" then the output of the tool is interpreted as the contents of a
ToolMessage. If "content_and_artifact" then the output is expected to be a
two-tuple corresponding to the (content, artifact) of a ToolMessage.

#### Default

```ts
"content"
```

#### Inherited from

`DynamicStructuredTool.responseFormat`

***

### returnDirect

> **returnDirect**: `boolean`

Defined in: node\_modules/@langchain/core/dist/tools/index.d.ts:26

Whether to return the tool's output directly.

Setting this to true means that after the tool is called,
an agent should stop looping.

#### Inherited from

`DynamicStructuredTool.returnDirect`

***

### schema

> **schema**: `any`

Defined in: [src/tool.ts:24](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/tool.ts#L24)

#### Overrides

`DynamicStructuredTool.schema`

***

### tags?

> `optional` **tags**: `string`[]

Defined in: node\_modules/@langchain/core/dist/language\_models/base.d.ts:45

#### Inherited from

`DynamicStructuredTool.tags`

***

### verbose

> **verbose**: `boolean`

Defined in: node\_modules/@langchain/core/dist/language\_models/base.d.ts:43

Whether to print out response text.

#### Inherited from

`DynamicStructuredTool.verbose`

***

### verboseParsingErrors

> **verboseParsingErrors**: `boolean`

Defined in: node\_modules/@langchain/core/dist/tools/index.d.ts:27

#### Inherited from

`DynamicStructuredTool.verboseParsingErrors`

## Accessors

### lc\_aliases

#### Get Signature

> **get** **lc\_aliases**(): `undefined` \| \{[`key`: `string`]: `string`; \}

Defined in: node\_modules/@langchain/core/dist/load/serializable.d.ts:65

A map of aliases for constructor args.
Keys are the attribute names, e.g. "foo".
Values are the alias that will replace the key in serialization.
This is used to eg. make argument names match Python.

##### Returns

`undefined` \| \{[`key`: `string`]: `string`; \}

#### Inherited from

`DynamicStructuredTool.lc_aliases`

***

### lc\_attributes

#### Get Signature

> **get** **lc\_attributes**(): `undefined` \| \{[`key`: `string`]: `undefined`; \}

Defined in: node\_modules/@langchain/core/dist/language\_models/base.d.ts:47

A map of additional attributes to merge with constructor args.
Keys are the attribute names, e.g. "foo".
Values are the attribute values, which will be serialized.
These attributes need to be accepted by the constructor as arguments.

##### Returns

`undefined` \| \{[`key`: `string`]: `undefined`; \}

#### Inherited from

`DynamicStructuredTool.lc_attributes`

***

### lc\_id

#### Get Signature

> **get** **lc\_id**(): `string`[]

Defined in: node\_modules/@langchain/core/dist/load/serializable.d.ts:43

The final serialized identifier for the module.

##### Returns

`string`[]

#### Inherited from

`DynamicStructuredTool.lc_id`

***

### lc\_namespace

#### Get Signature

> **get** **lc\_namespace**(): `string`[]

Defined in: node\_modules/@langchain/core/dist/tools/index.d.ts:28

A path to the module that contains the class, eg. ["langchain", "llms"]
Usually should be the same as the entrypoint the class is exported from.

##### Returns

`string`[]

#### Inherited from

`DynamicStructuredTool.lc_namespace`

***

### lc\_secrets

#### Get Signature

> **get** **lc\_secrets**(): `undefined` \| \{[`key`: `string`]: `string`; \}

Defined in: node\_modules/@langchain/core/dist/load/serializable.d.ts:49

A map of secrets, which will be omitted from serialization.
Keys are paths to the secret in constructor args, e.g. "foo.bar.baz".
Values are the secret ids, which will be used when deserializing.

##### Returns

`undefined` \| \{[`key`: `string`]: `string`; \}

#### Inherited from

`DynamicStructuredTool.lc_secrets`

***

### lc\_serializable\_keys

#### Get Signature

> **get** **lc\_serializable\_keys**(): `undefined` \| `string`[]

Defined in: node\_modules/@langchain/core/dist/load/serializable.d.ts:72

A manual list of keys that should be serialized.
If not overridden, all fields passed into the constructor will be serialized.

##### Returns

`undefined` \| `string`[]

#### Inherited from

`DynamicStructuredTool.lc_serializable_keys`

## Methods

### \_batchWithConfig()

> **\_batchWithConfig**\<`T`\>(`func`, `inputs`, `options?`, `batchOptions?`): `Promise`\<`any`[]\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:114

Internal method that handles batching and configuration for a runnable
It takes a function, input values, and optional configuration, and
returns a promise that resolves to the output values.

#### Type Parameters

##### T

`T` *extends* `any`

#### Parameters

##### func

(`inputs`, `options?`, `runManagers?`, `batchOptions?`) => `Promise`\<`any`[]\>

The function to be executed for each input value.

##### inputs

`T`[]

##### options?

`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\> & `object`\> | `Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\> & `object`\>[]

##### batchOptions?

`RunnableBatchOptions`

#### Returns

`Promise`\<`any`[]\>

A promise that resolves to the output values.

#### Inherited from

`DynamicStructuredTool._batchWithConfig`

***

### \_call()

> `protected` **\_call**(`arg`, `runManager?`, `parentConfig?`): `Promise`\<`any`\>

Defined in: node\_modules/@langchain/core/dist/tools/index.d.ts:127

#### Parameters

##### arg

`any`

##### runManager?

`CallbackManagerForToolRun`

##### parentConfig?

`RunnableConfig`\<`Record`\<`string`, `any`\>\>

#### Returns

`Promise`\<`any`\>

#### Inherited from

`DynamicStructuredTool._call`

***

### \_callWithConfig()

> `protected` **\_callWithConfig**\<`T`\>(`func`, `input`, `options?`): `Promise`\<`any`\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:102

#### Type Parameters

##### T

`T` *extends* `any`

#### Parameters

##### func

(`input`) => `Promise`\<`any`\> | (`input`, `config?`, `runManager?`) => `Promise`\<`any`\>

##### input

`T`

##### options?

`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\> & `object`

#### Returns

`Promise`\<`any`\>

#### Inherited from

`DynamicStructuredTool._callWithConfig`

***

### \_getOptionsList()

> `protected` **\_getOptionsList**\<`O`\>(`options`, `length?`): `Partial`\<`O`\>[]

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:69

#### Type Parameters

##### O

`O` *extends* `RunnableConfig`\<`Record`\<`string`, `any`\>\> & `object`

#### Parameters

##### options

`Partial`\<`O`\> | `Partial`\<`O`\>[]

##### length?

`number`

#### Returns

`Partial`\<`O`\>[]

#### Inherited from

`DynamicStructuredTool._getOptionsList`

***

### \_separateRunnableConfigFromCallOptions()

> `protected` **\_separateRunnableConfigFromCallOptions**(`options?`): \[`RunnableConfig`\<`Record`\<`string`, `any`\>\>, `Omit`\<`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\>, keyof `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>\]

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:101

#### Parameters

##### options?

`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

#### Returns

\[`RunnableConfig`\<`Record`\<`string`, `any`\>\>, `Omit`\<`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\>, keyof `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>\]

#### Inherited from

`DynamicStructuredTool._separateRunnableConfigFromCallOptions`

***

### \_streamIterator()

> **\_streamIterator**(`input`, `options?`): `AsyncGenerator`\<`any`\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:93

Default streaming implementation.
Subclasses should override this method if they support streaming output.

#### Parameters

##### input

`any`

##### options?

`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

#### Returns

`AsyncGenerator`\<`any`\>

#### Inherited from

`DynamicStructuredTool._streamIterator`

***

### \_streamLog()

> `protected` **\_streamLog**(`input`, `logStreamCallbackHandler`, `config`): `AsyncGenerator`\<`RunLogPatch`\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:163

#### Parameters

##### input

`any`

##### logStreamCallbackHandler

`LogStreamCallbackHandler`

##### config

`Partial`\<`CallOptions`\>

#### Returns

`AsyncGenerator`\<`RunLogPatch`\>

#### Inherited from

`DynamicStructuredTool._streamLog`

***

### \_transformStreamWithConfig()

> `protected` **\_transformStreamWithConfig**\<`I`, `O`\>(`inputGenerator`, `transformer`, `options?`): `AsyncGenerator`\<`O`\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:124

Helper method to transform an Iterator of Input values into an Iterator of
Output values, with callbacks.
Use this to implement `stream()` or `transform()` in Runnable subclasses.

#### Type Parameters

##### I

`I` *extends* `any`

##### O

`O` *extends* `any`

#### Parameters

##### inputGenerator

`AsyncGenerator`\<`I`\>

##### transformer

(`generator`, `runManager?`, `options?`) => `AsyncGenerator`\<`O`\>

##### options?

`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\> & `object`

#### Returns

`AsyncGenerator`\<`O`\>

#### Inherited from

`DynamicStructuredTool._transformStreamWithConfig`

***

### assign()

> **assign**(`mapping`): `Runnable`

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:142

Assigns new fields to the dict output of this runnable. Returns a new runnable.

#### Parameters

##### mapping

`RunnableMapLike`\<`Record`\<`string`, `unknown`\>, `Record`\<`string`, `unknown`\>\>

#### Returns

`Runnable`

#### Inherited from

`DynamicStructuredTool.assign`

***

### asTool()

> **asTool**\<`T`\>(`fields`): `RunnableToolLike`\<`ZodType`\<`ToolCall` \| `T`, `ZodTypeDef`, `ToolCall` \| `T`\>, `any`\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:310

Convert a runnable to a tool. Return a new instance of `RunnableToolLike`
which contains the runnable, name, description and schema.

#### Type Parameters

##### T

`T` *extends* `any` = `any`

#### Parameters

##### fields

###### description?

`string`

The description of the tool. Falls back to the description on the Zod schema if not provided, or undefined if neither are provided.

###### name?

`string`

The name of the tool. If not provided, it will default to the name of the runnable.

###### schema

`ZodType`\<`T`\>

The Zod schema for the input of the tool. Infers the Zod type from the input type of the runnable.

#### Returns

`RunnableToolLike`\<`ZodType`\<`ToolCall` \| `T`, `ZodTypeDef`, `ToolCall` \| `T`\>, `any`\>

An instance of `RunnableToolLike` which is a runnable that can be used as a tool.

#### Inherited from

`DynamicStructuredTool.asTool`

***

### batch()

#### Call Signature

> **batch**(`inputs`, `options?`, `batchOptions?`): `Promise`\<`any`[]\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:80

Default implementation of batch, which calls invoke N times.
Subclasses should override this method if they can batch more efficiently.

##### Parameters

###### inputs

`any`[]

Array of inputs to each batch call.

###### options?

Either a single call options object to apply to each batch call or an array for each call.

`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\> | `Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\>[]

###### batchOptions?

`RunnableBatchOptions` & `object`

##### Returns

`Promise`\<`any`[]\>

An array of RunOutputs, or mixed RunOutputs and errors if batchOptions.returnExceptions is set

##### Inherited from

`DynamicStructuredTool.batch`

#### Call Signature

> **batch**(`inputs`, `options?`, `batchOptions?`): `Promise`\<`any`[]\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:83

Default implementation of batch, which calls invoke N times.
Subclasses should override this method if they can batch more efficiently.

##### Parameters

###### inputs

`any`[]

Array of inputs to each batch call.

###### options?

Either a single call options object to apply to each batch call or an array for each call.

`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\> | `Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\>[]

###### batchOptions?

`RunnableBatchOptions` & `object`

##### Returns

`Promise`\<`any`[]\>

An array of RunOutputs, or mixed RunOutputs and errors if batchOptions.returnExceptions is set

##### Inherited from

`DynamicStructuredTool.batch`

#### Call Signature

> **batch**(`inputs`, `options?`, `batchOptions?`): `Promise`\<`any`[]\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:86

Default implementation of batch, which calls invoke N times.
Subclasses should override this method if they can batch more efficiently.

##### Parameters

###### inputs

`any`[]

Array of inputs to each batch call.

###### options?

Either a single call options object to apply to each batch call or an array for each call.

`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\> | `Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\>[]

###### batchOptions?

`RunnableBatchOptions`

##### Returns

`Promise`\<`any`[]\>

An array of RunOutputs, or mixed RunOutputs and errors if batchOptions.returnExceptions is set

##### Inherited from

`DynamicStructuredTool.batch`

***

### ~~bind()~~

> **bind**(`kwargs`): `Runnable`\<`any`, `any`, `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:36

Bind arguments to a Runnable, returning a new Runnable.

#### Parameters

##### kwargs

`Partial`\<`CallOptions`\>

#### Returns

`Runnable`\<`any`, `any`, `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

A new RunnableBinding that, when invoked, will apply the bound args.

#### Deprecated

Use [withConfig](#withconfig) instead. This will be removed in the next breaking release.

#### Inherited from

`DynamicStructuredTool.bind`

***

### ~~call()~~

> **call**\<`TArg`, `TConfig`\>(`arg`, `configArg?`, `tags?`): `Promise`\<`any`\>

Defined in: node\_modules/@langchain/core/dist/tools/index.d.ts:124

#### Type Parameters

##### TArg

`TArg` *extends* `any`

##### TConfig

`TConfig` *extends* `undefined` \| `ToolRunnableConfig`

#### Parameters

##### arg

`TArg`

##### configArg?

`TConfig`

##### tags?

`string`[]

**Deprecated**

#### Returns

`Promise`\<`any`\>

#### Deprecated

Use .invoke() instead. Will be removed in 0.3.0.

#### Inherited from

`DynamicStructuredTool.call`

***

### camelize()

> **camelize**(`str`): `string`

Defined in: [src/tool.ts:53](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/tool.ts#L53)

#### Parameters

##### str

`string`

#### Returns

`string`

***

### func()

> **func**(`args`): `Promise`\<`string`\>

Defined in: [src/tool.ts:45](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/tool.ts#L45)

#### Parameters

##### args

`any`

#### Returns

`Promise`\<`string`\>

#### Overrides

`DynamicStructuredTool.func`

***

### getGraph()

> **getGraph**(`_?`): `Graph`

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:127

#### Parameters

##### \_?

`RunnableConfig`\<`Record`\<`string`, `any`\>\>

#### Returns

`Graph`

#### Inherited from

`DynamicStructuredTool.getGraph`

***

### getName()

> **getName**(`suffix?`): `string`

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:27

#### Parameters

##### suffix?

`string`

#### Returns

`string`

#### Inherited from

`DynamicStructuredTool.getName`

***

### invoke()

> **invoke**\<`TInput`, `TConfig`\>(`input`, `config?`): `Promise`\<`any`\>

Defined in: node\_modules/@langchain/core/dist/tools/index.d.ts:47

Invokes the tool with the provided input and configuration.

#### Type Parameters

##### TInput

`TInput` *extends* `any`

##### TConfig

`TConfig` *extends* `undefined` \| `ToolRunnableConfig`

#### Parameters

##### input

`TInput`

The input for the tool.

##### config?

`TConfig`

Optional configuration for the tool.

#### Returns

`Promise`\<`any`\>

A Promise that resolves with the tool's output.

#### Inherited from

`DynamicStructuredTool.invoke`

***

### ~~map()~~

> **map**(): `Runnable`\<`any`[], `any`[], `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:43

Return a new Runnable that maps a list of inputs to a list of outputs,
by calling invoke() with each input.

#### Returns

`Runnable`\<`any`[], `any`[], `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

#### Deprecated

This will be removed in the next breaking release.

#### Inherited from

`DynamicStructuredTool.map`

***

### pick()

> **pick**(`keys`): `Runnable`

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:138

Pick keys from the dict output of this runnable. Returns a new runnable.

#### Parameters

##### keys

`string` | `string`[]

#### Returns

`Runnable`

#### Inherited from

`DynamicStructuredTool.pick`

***

### pipe()

> **pipe**\<`NewRunOutput`\>(`coerceable`): `Runnable`\<`any`, `Exclude`\<`NewRunOutput`, `Error`\>\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:134

Create a new runnable sequence that runs each individual runnable in series,
piping the output of one runnable into another runnable or runnable-like.

#### Type Parameters

##### NewRunOutput

`NewRunOutput`

#### Parameters

##### coerceable

`RunnableLike`\<`any`, `NewRunOutput`\>

A runnable, function, or object whose values are functions or runnables.

#### Returns

`Runnable`\<`any`, `Exclude`\<`NewRunOutput`, `Error`\>\>

A new runnable sequence.

#### Inherited from

`DynamicStructuredTool.pipe`

***

### resolve()

> **resolve**(`name`): `any`

Defined in: [src/tool.ts:49](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/tool.ts#L49)

#### Parameters

##### name

`string`

#### Returns

`any`

***

### snake\_case()

> **snake\_case**(`str`): `string`

Defined in: [src/tool.ts:61](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/tool.ts#L61)

#### Parameters

##### str

`string`

#### Returns

`string`

***

### stream()

> **stream**(`input`, `options?`): `Promise`\<`IterableReadableStream`\<`any`\>\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:100

Stream output in chunks.

#### Parameters

##### input

`any`

##### options?

`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

#### Returns

`Promise`\<`IterableReadableStream`\<`any`\>\>

A readable stream that is also an iterable.

#### Inherited from

`DynamicStructuredTool.stream`

***

### streamEvents()

#### Call Signature

> **streamEvents**(`input`, `options`, `streamOptions?`): `IterableReadableStream`\<`StreamEvent`\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:272

Generate a stream of events emitted by the internal steps of the runnable.

Use to create an iterator over StreamEvents that provide real-time information
about the progress of the runnable, including StreamEvents from intermediate
results.

A StreamEvent is a dictionary with the following schema:

- `event`: string - Event names are of the format: on_[runnable_type]_(start|stream|end).
- `name`: string - The name of the runnable that generated the event.
- `run_id`: string - Randomly generated ID associated with the given execution of
  the runnable that emitted the event. A child runnable that gets invoked as part of the execution of a
  parent runnable is assigned its own unique ID.
- `tags`: string[] - The tags of the runnable that generated the event.
- `metadata`: Record<string, any> - The metadata of the runnable that generated the event.
- `data`: Record<string, any>

Below is a table that illustrates some events that might be emitted by various
chains. Metadata fields have been omitted from the table for brevity.
Chain definitions have been included after the table.

**ATTENTION** This reference table is for the V2 version of the schema.

```md
+----------------------+-----------------------------+------------------------------------------+
| event                | input                       | output/chunk                             |
+======================+=============================+==========================================+
| on_chat_model_start  | {"messages": BaseMessage[]} |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_chat_model_stream |                             | AIMessageChunk("hello")                  |
+----------------------+-----------------------------+------------------------------------------+
| on_chat_model_end    | {"messages": BaseMessage[]} | AIMessageChunk("hello world")            |
+----------------------+-----------------------------+------------------------------------------+
| on_llm_start         | {'input': 'hello'}          |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_llm_stream        |                             | 'Hello'                                  |
+----------------------+-----------------------------+------------------------------------------+
| on_llm_end           | 'Hello human!'              |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_chain_start       |                             |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_chain_stream      |                             | "hello world!"                           |
+----------------------+-----------------------------+------------------------------------------+
| on_chain_end         | [Document(...)]             | "hello world!, goodbye world!"           |
+----------------------+-----------------------------+------------------------------------------+
| on_tool_start        | {"x": 1, "y": "2"}          |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_tool_end          |                             | {"x": 1, "y": "2"}                       |
+----------------------+-----------------------------+------------------------------------------+
| on_retriever_start   | {"query": "hello"}          |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_retriever_end     | {"query": "hello"}          | [Document(...), ..]                      |
+----------------------+-----------------------------+------------------------------------------+
| on_prompt_start      | {"question": "hello"}       |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_prompt_end        | {"question": "hello"}       | ChatPromptValue(messages: BaseMessage[]) |
+----------------------+-----------------------------+------------------------------------------+
```

The "on_chain_*" events are the default for Runnables that don't fit one of the above categories.

In addition to the standard events above, users can also dispatch custom events.

Custom events will be only be surfaced with in the `v2` version of the API!

A custom event has following format:

```md
+-----------+------+------------------------------------------------------------+
| Attribute | Type | Description                                                |
+===========+======+============================================================+
| name      | str  | A user defined name for the event.                         |
+-----------+------+------------------------------------------------------------+
| data      | Any  | The data associated with the event. This can be anything.  |
+-----------+------+------------------------------------------------------------+
```

Here's an example:

```ts
import { RunnableLambda } from "@langchain/core/runnables";
import { dispatchCustomEvent } from "@langchain/core/callbacks/dispatch";
// Use this import for web environments that don't support "async_hooks"
// and manually pass config to child runs.
// import { dispatchCustomEvent } from "@langchain/core/callbacks/dispatch/web";

const slowThing = RunnableLambda.from(async (someInput: string) => {
  // Placeholder for some slow operation
  await new Promise((resolve) => setTimeout(resolve, 100));
  await dispatchCustomEvent("progress_event", {
   message: "Finished step 1 of 2",
 });
 await new Promise((resolve) => setTimeout(resolve, 100));
 return "Done";
});

const eventStream = await slowThing.streamEvents("hello world", {
  version: "v2",
});

for await (const event of eventStream) {
 if (event.event === "on_custom_event") {
   console.log(event);
 }
}
```

##### Parameters

###### input

`any`

###### options

`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\> & `object`

###### streamOptions?

`Omit`\<`EventStreamCallbackHandlerInput`, `"autoClose"`\>

##### Returns

`IterableReadableStream`\<`StreamEvent`\>

##### Inherited from

`DynamicStructuredTool.streamEvents`

#### Call Signature

> **streamEvents**(`input`, `options`, `streamOptions?`): `IterableReadableStream`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:275

Generate a stream of events emitted by the internal steps of the runnable.

Use to create an iterator over StreamEvents that provide real-time information
about the progress of the runnable, including StreamEvents from intermediate
results.

A StreamEvent is a dictionary with the following schema:

- `event`: string - Event names are of the format: on_[runnable_type]_(start|stream|end).
- `name`: string - The name of the runnable that generated the event.
- `run_id`: string - Randomly generated ID associated with the given execution of
  the runnable that emitted the event. A child runnable that gets invoked as part of the execution of a
  parent runnable is assigned its own unique ID.
- `tags`: string[] - The tags of the runnable that generated the event.
- `metadata`: Record<string, any> - The metadata of the runnable that generated the event.
- `data`: Record<string, any>

Below is a table that illustrates some events that might be emitted by various
chains. Metadata fields have been omitted from the table for brevity.
Chain definitions have been included after the table.

**ATTENTION** This reference table is for the V2 version of the schema.

```md
+----------------------+-----------------------------+------------------------------------------+
| event                | input                       | output/chunk                             |
+======================+=============================+==========================================+
| on_chat_model_start  | {"messages": BaseMessage[]} |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_chat_model_stream |                             | AIMessageChunk("hello")                  |
+----------------------+-----------------------------+------------------------------------------+
| on_chat_model_end    | {"messages": BaseMessage[]} | AIMessageChunk("hello world")            |
+----------------------+-----------------------------+------------------------------------------+
| on_llm_start         | {'input': 'hello'}          |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_llm_stream        |                             | 'Hello'                                  |
+----------------------+-----------------------------+------------------------------------------+
| on_llm_end           | 'Hello human!'              |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_chain_start       |                             |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_chain_stream      |                             | "hello world!"                           |
+----------------------+-----------------------------+------------------------------------------+
| on_chain_end         | [Document(...)]             | "hello world!, goodbye world!"           |
+----------------------+-----------------------------+------------------------------------------+
| on_tool_start        | {"x": 1, "y": "2"}          |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_tool_end          |                             | {"x": 1, "y": "2"}                       |
+----------------------+-----------------------------+------------------------------------------+
| on_retriever_start   | {"query": "hello"}          |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_retriever_end     | {"query": "hello"}          | [Document(...), ..]                      |
+----------------------+-----------------------------+------------------------------------------+
| on_prompt_start      | {"question": "hello"}       |                                          |
+----------------------+-----------------------------+------------------------------------------+
| on_prompt_end        | {"question": "hello"}       | ChatPromptValue(messages: BaseMessage[]) |
+----------------------+-----------------------------+------------------------------------------+
```

The "on_chain_*" events are the default for Runnables that don't fit one of the above categories.

In addition to the standard events above, users can also dispatch custom events.

Custom events will be only be surfaced with in the `v2` version of the API!

A custom event has following format:

```md
+-----------+------+------------------------------------------------------------+
| Attribute | Type | Description                                                |
+===========+======+============================================================+
| name      | str  | A user defined name for the event.                         |
+-----------+------+------------------------------------------------------------+
| data      | Any  | The data associated with the event. This can be anything.  |
+-----------+------+------------------------------------------------------------+
```

Here's an example:

```ts
import { RunnableLambda } from "@langchain/core/runnables";
import { dispatchCustomEvent } from "@langchain/core/callbacks/dispatch";
// Use this import for web environments that don't support "async_hooks"
// and manually pass config to child runs.
// import { dispatchCustomEvent } from "@langchain/core/callbacks/dispatch/web";

const slowThing = RunnableLambda.from(async (someInput: string) => {
  // Placeholder for some slow operation
  await new Promise((resolve) => setTimeout(resolve, 100));
  await dispatchCustomEvent("progress_event", {
   message: "Finished step 1 of 2",
 });
 await new Promise((resolve) => setTimeout(resolve, 100));
 return "Done";
});

const eventStream = await slowThing.streamEvents("hello world", {
  version: "v2",
});

for await (const event of eventStream) {
 if (event.event === "on_custom_event") {
   console.log(event);
 }
}
```

##### Parameters

###### input

`any`

###### options

`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\> & `object`

###### streamOptions?

`Omit`\<`EventStreamCallbackHandlerInput`, `"autoClose"`\>

##### Returns

`IterableReadableStream`\<`Uint8Array`\<`ArrayBufferLike`\>\>

##### Inherited from

`DynamicStructuredTool.streamEvents`

***

### streamLog()

> **streamLog**(`input`, `options?`, `streamOptions?`): `AsyncGenerator`\<`RunLogPatch`\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:162

Stream all output from a runnable, as reported to the callback system.
This includes all inner runs of LLMs, Retrievers, Tools, etc.
Output is streamed as Log objects, which include a list of
jsonpatch ops that describe how the state of the run has changed in each
step, and the final state of the run.
The jsonpatch ops can be applied in order to construct state.

#### Parameters

##### input

`any`

##### options?

`Partial`\<`RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

##### streamOptions?

`Omit`\<`LogStreamCallbackHandlerInput`, `"autoClose"`\>

#### Returns

`AsyncGenerator`\<`RunLogPatch`\>

#### Inherited from

`DynamicStructuredTool.streamLog`

***

### toJSON()

> **toJSON**(): `Serialized`

Defined in: node\_modules/@langchain/core/dist/load/serializable.d.ts:74

#### Returns

`Serialized`

#### Inherited from

`DynamicStructuredTool.toJSON`

***

### toJSONNotImplemented()

> **toJSONNotImplemented**(): `SerializedNotImplemented`

Defined in: node\_modules/@langchain/core/dist/load/serializable.d.ts:75

#### Returns

`SerializedNotImplemented`

#### Inherited from

`DynamicStructuredTool.toJSONNotImplemented`

***

### transform()

> **transform**(`generator`, `options`): `AsyncGenerator`\<`any`\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:150

Default implementation of transform, which buffers input and then calls stream.
Subclasses should override this method if they can start producing output while
input is still being generated.

#### Parameters

##### generator

`AsyncGenerator`\<`any`\>

##### options

`Partial`\<`CallOptions`\>

#### Returns

`AsyncGenerator`\<`any`\>

#### Inherited from

`DynamicStructuredTool.transform`

***

### withConfig()

> **withConfig**(`config`): `Runnable`\<`any`, `any`, `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:59

Bind config to a Runnable, returning a new Runnable.

#### Parameters

##### config

`Partial`\<`CallOptions`\>

New configuration parameters to attach to the new runnable.

#### Returns

`Runnable`\<`any`, `any`, `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

A new RunnableBinding with a config matching what's passed.

#### Inherited from

`DynamicStructuredTool.withConfig`

***

### withFallbacks()

> **withFallbacks**(`fields`): `RunnableWithFallbacks`\<`any`, `any`\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:66

Create a new runnable from the current one that will try invoking
other passed fallback runnables if the initial invocation fails.

#### Parameters

##### fields

\{ `fallbacks`: `Runnable`\<`any`, `any`, `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>[]; \}

###### fallbacks

`Runnable`\<`any`, `any`, `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>[]

Other runnables to call if the runnable errors.

| `Runnable`\<`any`, `any`, `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>[]

#### Returns

`RunnableWithFallbacks`\<`any`, `any`\>

A new RunnableWithFallbacks.

#### Inherited from

`DynamicStructuredTool.withFallbacks`

***

### withListeners()

> **withListeners**(`params`): `Runnable`\<`any`, `any`, `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:293

Bind lifecycle listeners to a Runnable, returning a new Runnable.
The Run object contains information about the run, including its id,
type, input, output, error, startTime, endTime, and any tags or metadata
added to the run.

#### Parameters

##### params

The object containing the callback functions.

###### onEnd?

(`run`, `config?`) => `void` \| `Promise`\<`void`\>

Called after the runnable finishes running, with the Run object.

###### onError?

(`run`, `config?`) => `void` \| `Promise`\<`void`\>

Called if the runnable throws an error, with the Run object.

###### onStart?

(`run`, `config?`) => `void` \| `Promise`\<`void`\>

Called before the runnable starts running, with the Run object.

#### Returns

`Runnable`\<`any`, `any`, `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

#### Inherited from

`DynamicStructuredTool.withListeners`

***

### withRetry()

> **withRetry**(`fields?`): `RunnableRetry`\<`any`, `any`, `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:50

Add retry logic to an existing runnable.

#### Parameters

##### fields?

###### onFailedAttempt?

`RunnableRetryFailedAttemptHandler`

A function that is called when a retry fails.

###### stopAfterAttempt?

`number`

The number of attempts to retry.

#### Returns

`RunnableRetry`\<`any`, `any`, `RunnableConfig`\<`Record`\<`string`, `any`\>\>\>

A new RunnableRetry that, when invoked, will retry according to the parameters.

#### Inherited from

`DynamicStructuredTool.withRetry`

***

### isRunnable()

> `static` **isRunnable**(`thing`): `thing is Runnable<any, any, RunnableConfig<Record<string, any>>>`

Defined in: node\_modules/@langchain/core/dist/runnables/base.d.ts:281

#### Parameters

##### thing

`any`

#### Returns

`thing is Runnable<any, any, RunnableConfig<Record<string, any>>>`

#### Inherited from

`DynamicStructuredTool.isRunnable`

***

### lc\_name()

> `static` **lc\_name**(): `string`

Defined in: node\_modules/@langchain/core/dist/tools/index.d.ts:115

The name of the serializable. Override to provide an alias or
to preserve the serialized module name in minified environments.

Implemented as a static method to support loading logic.

#### Returns

`string`

#### Inherited from

`DynamicStructuredTool.lc_name`
