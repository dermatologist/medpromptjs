[**medpromptjs**](../README.md)

***

[medpromptjs](../globals.md) / BaseAgent

# Class: BaseAgent

Defined in: [src/agent.ts:27](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L27)

## Constructors

### Constructor

> **new BaseAgent**(`container`): `BaseAgent`

Defined in: [src/agent.ts:45](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L45)

#### Parameters

##### container

`any`

#### Returns

`BaseAgent`

## Properties

### chat\_model

> **chat\_model**: `boolean`

Defined in: [src/agent.ts:42](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L42)

***

### container

> **container**: `any`

Defined in: [src/agent.ts:28](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L28)

***

### llm

> **llm**: `LLM`

Defined in: [src/agent.ts:41](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L41)

***

### prompt

> **prompt**: `any`

Defined in: [src/agent.ts:40](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L40)

***

### runnable

> **runnable**: `any`

Defined in: [src/agent.ts:43](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L43)

## Accessors

### description

#### Get Signature

> **get** **description**(): `string`

Defined in: [src/agent.ts:60](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L60)

##### Returns

`string`

#### Set Signature

> **set** **description**(`value`): `void`

Defined in: [src/agent.ts:63](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L63)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### name

#### Get Signature

> **get** **name**(): `string`

Defined in: [src/agent.ts:53](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L53)

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

Defined in: [src/agent.ts:56](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L56)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### template

#### Get Signature

> **get** **template**(): `string`

Defined in: [src/agent.ts:68](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L68)

##### Returns

`string`

#### Set Signature

> **set** **template**(`value`): `void`

Defined in: [src/agent.ts:71](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L71)

##### Parameters

###### value

`string`

##### Returns

`void`

***

### tools

#### Get Signature

> **get** **tools**(): `ToolInterface`\<`StringInputToolSchema`, `any`, `any`\>[]

Defined in: [src/agent.ts:84](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L84)

##### Returns

`ToolInterface`\<`StringInputToolSchema`, `any`, `any`\>[]

#### Set Signature

> **set** **tools**(`value`): `void`

Defined in: [src/agent.ts:87](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L87)

##### Parameters

###### value

`ToolInterface`\<`StringInputToolSchema`, `any`, `any`\>[]

##### Returns

`void`

## Methods

### camelize()

> **camelize**(`str`): `string`

Defined in: [src/agent.ts:113](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L113)

#### Parameters

##### str

`string`

#### Returns

`string`

***

### initialize()

> **initialize**(): `void`

Defined in: [src/agent.ts:91](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L91)

#### Returns

`void`

***

### resolve()

> **resolve**(`name`): `any`

Defined in: [src/agent.ts:109](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L109)

#### Parameters

##### name

`string`

#### Returns

`any`

***

### run()

> **run**(`input`): `Promise`\<`ChainValues`\>

Defined in: [src/agent.ts:129](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L129)

#### Parameters

##### input

`any`

#### Returns

`Promise`\<`ChainValues`\>

***

### snake\_case()

> **snake\_case**(`str`): `string`

Defined in: [src/agent.ts:121](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/agent.ts#L121)

#### Parameters

##### str

`string`

#### Returns

`string`
