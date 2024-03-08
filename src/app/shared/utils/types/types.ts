/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Group = "Group",
	Ingredient = "Ingredient",
	QuantityFamily = "QuantityFamily",
	QuantityType = "QuantityType",
	Recipe = "Recipe",
	RecipeIngredient = "RecipeIngredient",
	RecipeIngredientSpecGroup = "RecipeIngredientSpecGroup",
	Spec = "Spec",
	Users = "Users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type GroupRecord = {
	Ingredient?: RecordIdString
	Name?: string
	Specs?: RecordIdString[]
}

export type IngredientRecord = {
	Name?: string
	Picture: string
}

export type QuantityFamilyRecord = {
	Name?: string
}

export type QuantityTypeRecord = {
	Name?: string
	QuantityFamily?: RecordIdString
}

export type RecipeRecord = {
	Name?: string
	User?: RecordIdString
}

export type RecipeIngredientRecord = {
	Ingredient?: RecordIdString
	IsOptional?: boolean
	QuantityType?: RecordIdString
	QuantityValue?: number
	Recipe?: RecordIdString
}

export type RecipeIngredientSpecGroupRecord = {
	Group?: RecordIdString
	RecipeIngredient?: RecordIdString
	Spec?: RecordIdString
}

export type SpecRecord = {
	Group?: RecordIdString
	IsStrict?: boolean
	Name?: string
}

export type UsersRecord = {
	Avatar?: string
	Name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type GroupResponse<Texpand = unknown> = Required<GroupRecord> & BaseSystemFields<Texpand>
export type IngredientResponse<Texpand = unknown> = Required<IngredientRecord> & BaseSystemFields<Texpand>
export type QuantityFamilyResponse<Texpand = unknown> = Required<QuantityFamilyRecord> & BaseSystemFields<Texpand>
export type QuantityTypeResponse<Texpand = unknown> = Required<QuantityTypeRecord> & BaseSystemFields<Texpand>
export type RecipeResponse<Texpand = unknown> = Required<RecipeRecord> & BaseSystemFields<Texpand>
export type RecipeIngredientResponse<Texpand = unknown> = Required<RecipeIngredientRecord> & BaseSystemFields<Texpand>
export type RecipeIngredientSpecGroupResponse<Texpand = unknown> = Required<RecipeIngredientSpecGroupRecord> & BaseSystemFields<Texpand>
export type SpecResponse<Texpand = unknown> = Required<SpecRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	Group: GroupRecord
	Ingredient: IngredientRecord
	QuantityFamily: QuantityFamilyRecord
	QuantityType: QuantityTypeRecord
	Recipe: RecipeRecord
	RecipeIngredient: RecipeIngredientRecord
	RecipeIngredientSpecGroup: RecipeIngredientSpecGroupRecord
	Spec: SpecRecord
	Users: UsersRecord
}

export type CollectionResponses = {
	Group: GroupResponse
	Ingredient: IngredientResponse
	QuantityFamily: QuantityFamilyResponse
	QuantityType: QuantityTypeResponse
	Recipe: RecipeResponse
	RecipeIngredient: RecipeIngredientResponse
	RecipeIngredientSpecGroup: RecipeIngredientSpecGroupResponse
	Spec: SpecResponse
	Users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'Group'): RecordService<GroupResponse>
	collection(idOrName: 'Ingredient'): RecordService<IngredientResponse>
	collection(idOrName: 'QuantityFamily'): RecordService<QuantityFamilyResponse>
	collection(idOrName: 'QuantityType'): RecordService<QuantityTypeResponse>
	collection(idOrName: 'Recipe'): RecordService<RecipeResponse>
	collection(idOrName: 'RecipeIngredient'): RecordService<RecipeIngredientResponse>
	collection(idOrName: 'RecipeIngredientSpecGroup'): RecordService<RecipeIngredientSpecGroupResponse>
	collection(idOrName: 'Spec'): RecordService<SpecResponse>
	collection(idOrName: 'Users'): RecordService<UsersResponse>
}
