import { isNil } from "../operators"
import { Validate } from "../snakecase"
import { Dictionary } from "../types"
import { Checkbox, Combine, ObjectKeys } from "../utils"

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

export const Blueprints = Object.freeze({
  assign,
  typeOf,
} as const)