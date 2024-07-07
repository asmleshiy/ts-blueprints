import { Dictionary } from '../types'

export type Combine<T> = {
  [K in keyof T]: T[K]
} & {}

export type Select<TPick, TFrom extends TPick> = {
  [P in Extract<keyof TFrom, keyof TPick>]: TFrom[P]
} & {}

export type Subtract<TFrom, TRemove> = {
  [P in Exclude<keyof TFrom, keyof TRemove>]: TFrom[P]
} & {}

export type ObjectKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T] & string

export type ObjectValues<T> = T extends { [K in keyof T]: infer U }
  ? (U extends Function ? never : U)
  : never

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export type Reflect<T extends object> = {
  [K in keyof T]?: T[K]
}

export type Malformed<T extends object> = {
  [K in keyof T]?: unknown
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[] ? DeepPartial<U>[] : DeepPartial<T[P]>
}

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (infer U)[] ? DeepReadonly<U>[] : DeepReadonly<T[P]>
}
export type PickRest<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type ExcludeExact<T, K extends keyof T> = Exclude<keyof T, K> & string

export type ExtractExact<T, K extends keyof T> = Extract<keyof T, K> & string

export type TypePicker<T, K extends T> = Extract<T, K> & string

export type TypeOmitter<T, K extends T> = Exclude<T, K> & string

export type Toggle<T, Keys extends keyof T = keyof T> =
  & Pick<T, Exclude<keyof T, Keys>>
  & {
    [K in Keys]-?: Combine<
      & Required<Pick<T, K>>
      & Partial<Record<Exclude<Keys, K>, undefined>>
    >
  }[Keys]

export type Checkbox<T, Keys extends keyof T = keyof T> =
  & Pick<T, Exclude<keyof T, Keys>>
  & {
    [K in Keys]-?: Combine<
      & Required<Pick<T, K>>
      & Partial<Pick<T, Exclude<Keys, K>>>
    >
  }[Keys]

export type KeysSelector<T extends object> = Checkbox<Dictionary<ObjectKeys<T>, true>>
