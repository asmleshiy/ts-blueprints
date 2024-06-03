import { Dictionary } from '../types'

export declare type Combine<T> = {
  [K in keyof T]: T[K]
} & {}

export declare type Select<TPick, TFrom extends TPick> = {
  [P in Extract<keyof TFrom, keyof TPick>]: TFrom[P]
} & {}

export declare type Subtract<TFrom, TRemove> = {
  [P in Exclude<keyof TFrom, keyof TRemove>]: TFrom[P]
} & {}

export declare type ObjectKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T] & string

export declare type ObjectValues<T> = T extends { [K in keyof T]: infer U }
  ? (U extends Function ? never : U)
  : never

export declare type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export declare type Reflect<T extends object> = {
  [K in keyof T]?: T[K]
}

export declare type Malformed<T extends object> = {
  [K in keyof T]?: unknown
}

export declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[] ? DeepPartial<U>[] : DeepPartial<T[P]>
}

export declare type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (infer U)[] ? DeepReadonly<U>[] : DeepReadonly<T[P]>
}
export declare type PickRest<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export declare type ExcludeExact<T, K extends keyof T> = Exclude<keyof T, K> & string

export declare type ExtractExact<T, K extends keyof T> = Extract<keyof T, K> & string

export declare type TypePicker<T, K extends T> = Extract<T, K> & string

export declare type TypeOmitter<T, K extends T> = Exclude<T, K> & string

export declare type Toggle<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>
}[Keys]

export declare type Checkbox<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]

export declare type KeysSelector<T extends object> = Checkbox<Dictionary<ObjectKeys<T>, true>>
