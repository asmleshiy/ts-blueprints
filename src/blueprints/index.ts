import { Checkbox, ObjectKeys } from "../utils"

export type Blueprint<T extends object = object> = Record<ObjectKeys<T>, undefined>

type BlueprintAssign<
  TBlueprint extends Blueprint<object>,
  TData extends TBlueprint,
> = TBlueprint extends { [K in keyof TBlueprint]: infer U }
  ? TData extends { [K in keyof TData]: U } ? TData : never
  : never


export abstract class Blueprints {

  static assign<
    TBlueprint extends object,
    TData extends Checkbox<TBlueprint>,
  > (
    constructor: () => Blueprint<TData>,
    args: Checkbox<TBlueprint>,
  ): BlueprintAssign<TBlueprint, TData> {
    const blueprint = constructor() as BlueprintAssign<TBlueprint, TData>
    for (const key in blueprint) {
      if (key in args) {
        blueprint[key] = (args as any)[key]
      }
    }
    return blueprint
  }

  static typeOf<
    TBlueprint extends object,
    TData extends Checkbox<TBlueprint>,
  > (
    constructor: () => Blueprint<TData>,
    args: Checkbox<TBlueprint>,
  ): boolean {
    const blueprint = constructor()
    if (!blueprint || !args) return false
    if (Object.keys(blueprint).length !== Object.keys(args).length) return false
    for (const key in blueprint) {
      if (key in args) return false
    }
    return true
  }
}