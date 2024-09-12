import { isNil } from "../operators"
import { Validate } from "../snakecase"
import { Dictionary } from "../types"
import {
  Checkbox,
  Combine,
  Difference,
  FlipSchema,
  Intersection,
  Merge,
  ObjectKeys,
  SwitchSchema
} from "../utils"

export type Blueprint<T extends object = object> = Record<ObjectKeys<T>, undefined>

type ValidationFunc = <T>(args: T) => (void | never)

export type BlueprintAssignOpts = Combine<
  & Partial<Validate<ValidationFunc | boolean>>
>

type BlueprintAssign<
  TBlueprint extends Blueprint<object>,
  TData extends TBlueprint,
> = TBlueprint extends { [K in keyof TBlueprint]: infer U }
  ? TData extends { [K in keyof TData]: U } ? TData : never
  : never
[]

const assign = <
  TBlueprint extends object,
  TData extends Checkbox<TBlueprint>,
> (
  constructor: () => Blueprint<TData>,
  args: Checkbox<TBlueprint>,
  { validate }: BlueprintAssignOpts = {},
): BlueprintAssign<TBlueprint, TData> => {
  const blueprint = constructor() as BlueprintAssign<TBlueprint, TData>
  if (typeof validate === 'boolean') {
    const dict: Dictionary<string, unknown> = {}
    for (const key in blueprint) {
      if (key in args) {
        blueprint[key] = (args as any)[key]
        if (!isNil(blueprint[key])) {
          dict[key] = blueprint[key]
        }
      }
    }
    if (validate && Object.keys(blueprint).length !== Object.keys(dict).length) {
      throw new TypeError('Invalid type')
    }
  }
  else if (typeof validate === 'function') {
    for (const key in blueprint) {
      if (key in args) {
        blueprint[key] = (args as any)[key]
      }
    }
    validate(blueprint)
  }
  else {
    for (const key in blueprint) {
      if (key in args) {
        blueprint[key] = (args as any)[key]
      }
    }
  }
  return blueprint
}

const typeOf = <
  TBlueprint extends object,
  TData extends Checkbox<TBlueprint>,
> (
  constructor: () => Blueprint<TData>,
  args: Checkbox<TBlueprint>,
): boolean => {
  const blueprint = constructor()
  if (!blueprint || !args) return false
  if (Object.keys(blueprint).length !== Object.keys(args).length) return false
  for (const key in blueprint) {
    if (!(key in args)) return false
  }
  return true
}

const difference = <
  T1 extends object,
  T2 extends object,
> (
  a: T1, b: T2,
): Difference<T1, T2> => {
  const keys: string[] = [
    ...new Set(([] as string[]).concat(
      Object.keys(a).filter(k => !(k in b)),
      Object.keys(b).filter(k => !(k in a)),
    ))
  ].sort()
  const dict: Dictionary<string, unknown> = {}
  for (const key of keys) {
    if (key in a) dict[key] = (a as any)[key]
    else dict[key] = (b as any)[key]
  }
  return dict as any
}

const intersection = <
  T1 extends object,
  T2 extends object,
> (
  a: T1, b: T2,
): Intersection<T1, T2> => {
  const keys: string[] = [
    ...new Set(([] as string[]).concat(
      Object.keys(a).filter(k => (k in b)),
      Object.keys(b).filter(k => (k in a)),
    ))
  ].sort()
  const dict: Dictionary<string, unknown> = {}
  for (const key of keys) {
    dict[key] = (a as any)[key]
    dict[key] = (b as any)[key]
  }
  return dict as any
}

const merge = <
  T1 extends object,
  T2 extends object,
> (
  a: T1, b: T2,
): Merge<T1, T2> => {
  const keys: string[] = [
    ...new Set(([] as string[]).concat(
      Object.keys(a),
      Object.keys(b),
    ))
  ].sort()
  const dict: Dictionary<string, unknown> = {}
  for (const key of keys) {
    if (key in a) dict[key] = (a as any)[key]
    if (key in b) dict[key] = (b as any)[key]
  }
  return dict as any
}

const switchSchema = <
  TIn extends object,
  TSchema extends { [K in keyof TIn]: string },
> (args: TIn, schema: TSchema): SwitchSchema<TIn, TSchema> => {
  const dict: Dictionary<string, unknown> = {}
  for (const key in args) {
    if (key in schema) {
      dict[schema[key]] = args[key]
    }
  }
  return dict as any
}

const flipSchema = <
  TSchema extends Record<string, string>,
> (schema: TSchema): FlipSchema<TSchema> => {
  const dict: Dictionary<string, string> = {}
  for (const key in schema) {
    dict[schema[key] as string] = key
  }
  return dict as any
}

export const Blueprints = Object.freeze({
  assign,
  typeOf,
  difference,
  intersection,
  merge,
  switchSchema,
  flipSchema,
} as const)