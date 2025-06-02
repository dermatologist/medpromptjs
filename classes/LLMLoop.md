[**medpromptjs**](../README.md)

***

[medpromptjs](../globals.md) / LLMLoop

# Class: LLMLoop

Defined in: [src/llm\_loop.ts:6](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L6)

## Extends

- [`BaseChain`](BaseChain.md)

## Constructors

### Constructor

> **new LLMLoop**(`container`): `LLMLoop`

Defined in: [src/chain.ts:36](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L36)

#### Parameters

##### container

`any`

#### Returns

`LLMLoop`

#### Inherited from

[`BaseChain`](BaseChain.md).[`constructor`](BaseChain.md#constructor)

## Properties

### \_mapDocTemplate

> **\_mapDocTemplate**: `string`

Defined in: [src/llm\_loop.ts:18](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L18)

***

### \_mapQueryTemplate

> **\_mapQueryTemplate**: `string`

Defined in: [src/llm\_loop.ts:9](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L9)

***

### \_reduceChainTemplate

> **\_reduceChainTemplate**: `string`

Defined in: [src/llm\_loop.ts:32](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L32)

***

### chat\_model

> **chat\_model**: `boolean`

Defined in: [src/chain.ts:33](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L33)

#### Inherited from

[`BaseChain`](BaseChain.md).[`chat_model`](BaseChain.md#chat_model)

***

### container

> **container**: `any`

Defined in: [src/chain.ts:27](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L27)

#### Inherited from

[`BaseChain`](BaseChain.md).[`container`](BaseChain.md#container)

***

### llm

> **llm**: `LLM`

Defined in: [src/chain.ts:32](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L32)

#### Inherited from

[`BaseChain`](BaseChain.md).[`llm`](BaseChain.md#llm)

***

### prompt

> **prompt**: `any`

Defined in: [src/chain.ts:31](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L31)

#### Inherited from

[`BaseChain`](BaseChain.md).[`prompt`](BaseChain.md#prompt)

***

### runnable

> **runnable**: `any`

Defined in: [src/chain.ts:34](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L34)

#### Inherited from

[`BaseChain`](BaseChain.md).[`runnable`](BaseChain.md#runnable)

***

### stringExpression

> **stringExpression**: `string` = `''`

Defined in: [src/llm\_loop.ts:8](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L8)

## Accessors

### description

#### Get Signature

> **get** **description**(): `string`

Defined in: [src/chain.ts:51](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L51)

##### Returns

`string`

#### Set Signature

> **set** **description**(`value`): `void`

Defined in: [src/chain.ts:54](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L54)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`BaseChain`](BaseChain.md).[`description`](BaseChain.md#description)

***

### mapDocTemplate

#### Get Signature

> **get** **mapDocTemplate**(): `string`

Defined in: [src/llm\_loop.ts:59](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L59)

##### Returns

`string`

#### Set Signature

> **set** **mapDocTemplate**(`template`): `void`

Defined in: [src/llm\_loop.ts:62](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L62)

##### Parameters

###### template

`string`

##### Returns

`void`

***

### mapQueryTemplate

#### Get Signature

> **get** **mapQueryTemplate**(): `string`

Defined in: [src/llm\_loop.ts:53](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L53)

##### Returns

`string`

#### Set Signature

> **set** **mapQueryTemplate**(`template`): `void`

Defined in: [src/llm\_loop.ts:56](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L56)

##### Parameters

###### template

`string`

##### Returns

`void`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [src/chain.ts:44](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L44)

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

Defined in: [src/chain.ts:47](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L47)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`BaseChain`](BaseChain.md).[`name`](BaseChain.md#name)

***

### reduceChainTemplate

#### Get Signature

> **get** **reduceChainTemplate**(): `string`

Defined in: [src/llm\_loop.ts:65](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L65)

##### Returns

`string`

#### Set Signature

> **set** **reduceChainTemplate**(`template`): `void`

Defined in: [src/llm\_loop.ts:68](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L68)

##### Parameters

###### template

`string`

##### Returns

`void`

***

### template

#### Get Signature

> **get** **template**(): `string`

Defined in: [src/chain.ts:59](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L59)

##### Returns

`string`

#### Set Signature

> **set** **template**(`value`): `void`

Defined in: [src/chain.ts:62](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L62)

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`BaseChain`](BaseChain.md).[`template`](BaseChain.md#template)

## Methods

### \_printValues()

> **\_printValues**(`obj`): `string`

Defined in: [src/llm\_loop.ts:243](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L243)

#### Parameters

##### obj

`any`

#### Returns

`string`

***

### camelize()

> **camelize**(`str`): `string`

Defined in: [src/chain.ts:96](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L96)

#### Parameters

##### str

`string`

#### Returns

`string`

#### Inherited from

[`BaseChain`](BaseChain.md).[`camelize`](BaseChain.md#camelize)

***

### camelToString()

> **camelToString**(`camelCase`): `string`

Defined in: [src/llm\_loop.ts:148](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L148)

#### Parameters

##### camelCase

`string`

#### Returns

`string`

***

### chain()

> **chain**(`input`): `Promise`\<`boolean`\>

Defined in: [src/llm\_loop.ts:277](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L277)

#### Parameters

##### input

`any`

#### Returns

`Promise`\<`boolean`\>

#### Overrides

[`BaseChain`](BaseChain.md).[`chain`](BaseChain.md#chain)

***

### checkAssertion()

> **checkAssertion**(`expression`, `context`): `Promise`\<`boolean`\>

Defined in: [src/llm\_loop.ts:72](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L72)

#### Parameters

##### expression

`string`

##### context

`any`

#### Returns

`Promise`\<`boolean`\>

***

### checkMention()

> **checkMention**(`expression`, `context`): `Promise`\<`boolean`\>

Defined in: [src/llm\_loop.ts:120](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L120)

#### Parameters

##### expression

`string`

##### context

`any`

#### Returns

`Promise`\<`boolean`\>

***

### checkNegation()

> **checkNegation**(`expression`, `context`): `Promise`\<`boolean`\>

Defined in: [src/llm\_loop.ts:125](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L125)

#### Parameters

##### expression

`string`

##### context

`any`

#### Returns

`Promise`\<`boolean`\>

***

### extractObjectsByKey()

> **extractObjectsByKey**(`obj`, `key`): `any`[]

Defined in: [src/llm\_loop.ts:223](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L223)

#### Parameters

##### obj

`any`

##### key

`string`

#### Returns

`any`[]

***

### findDatesAndConvertToTimeElapsed()

> **findDatesAndConvertToTimeElapsed**(`text`): `string`

Defined in: [src/llm\_loop.ts:130](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L130)

#### Parameters

##### text

`string`

#### Returns

`string`

***

### initialize()

> **initialize**(): `void`

Defined in: [src/chain.ts:74](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L74)

#### Returns

`void`

#### Inherited from

[`BaseChain`](BaseChain.md).[`initialize`](BaseChain.md#initialize)

***

### printValues()

> **printValues**(`obj`): `string`

Defined in: [src/llm\_loop.ts:208](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L208)

#### Parameters

##### obj

`any`

#### Returns

`string`

***

### resolve()

> **resolve**(`name`): `any`

Defined in: [src/chain.ts:92](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L92)

#### Parameters

##### name

`string`

#### Returns

`any`

#### Inherited from

[`BaseChain`](BaseChain.md).[`resolve`](BaseChain.md#resolve)

***

### snake\_case()

> **snake\_case**(`str`): `string`

Defined in: [src/chain.ts:104](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L104)

#### Parameters

##### str

`string`

#### Returns

`string`

#### Inherited from

[`BaseChain`](BaseChain.md).[`snake_case`](BaseChain.md#snake_case)

***

### stringToBoolean()

> **stringToBoolean**(`str`): `boolean`

Defined in: [src/llm\_loop.ts:154](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L154)

#### Parameters

##### str

`string`

#### Returns

`boolean`

***

### textSplitter()

> **textSplitter**(`text`, `chunkSize`, `chunkOverlap`): `Promise`\<`string`[]\>

Defined in: [src/llm\_loop.ts:177](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/llm_loop.ts#L177)

#### Parameters

##### text

`string`

##### chunkSize

`number` = `3900`

##### chunkOverlap

`number` = `0`

#### Returns

`Promise`\<`string`[]\>
