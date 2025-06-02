[**medpromptjs**](../README.md)

***

[medpromptjs](../globals.md) / BaseChain

# Class: BaseChain

Defined in: [src/chain.ts:26](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L26)

## Extended by

- [`LLMLoop`](LLMLoop.md)

## Constructors

### Constructor

> **new BaseChain**(`container`): `BaseChain`

Defined in: [src/chain.ts:36](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L36)

#### Parameters

##### container

`any`

#### Returns

`BaseChain`

## Properties

### chat\_model

> **chat\_model**: `boolean`

Defined in: [src/chain.ts:33](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L33)

***

### container

> **container**: `any`

Defined in: [src/chain.ts:27](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L27)

***

### llm

> **llm**: `LLM`

Defined in: [src/chain.ts:32](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L32)

***

### prompt

> **prompt**: `any`

Defined in: [src/chain.ts:31](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L31)

***

### runnable

> **runnable**: `any`

Defined in: [src/chain.ts:34](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L34)

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

## Methods

### camelize()

> **camelize**(`str`): `string`

Defined in: [src/chain.ts:96](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L96)

#### Parameters

##### str

`string`

#### Returns

`string`

***

### chain()

> **chain**(`input`): `Promise`\<`any`\>

Defined in: [src/chain.ts:114](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L114)

#### Parameters

##### input

`any`

#### Returns

`Promise`\<`any`\>

***

### initialize()

> **initialize**(): `void`

Defined in: [src/chain.ts:74](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L74)

#### Returns

`void`

***

### resolve()

> **resolve**(`name`): `any`

Defined in: [src/chain.ts:92](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L92)

#### Parameters

##### name

`string`

#### Returns

`any`

***

### snake\_case()

> **snake\_case**(`str`): `string`

Defined in: [src/chain.ts:104](https://github.com/dermatologist/medpromptjs/blob/c322582bcb4136938ce3ae8891f48839c7482325/src/chain.ts#L104)

#### Parameters

##### str

`string`

#### Returns

`string`
