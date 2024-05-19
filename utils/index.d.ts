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
}[keyof T]

export declare type ObjectValues<T> = T extends { [K in keyof T]: infer U }
  ? (U extends Function ? never : U)
  : never

export declare type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export declare type Reflect<T extends object> = {
  [key in keyof T]?: T[key]
}

export declare type Malformed<T extends object> = {
  [key in keyof T]?: unknown
}

export declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[] ? DeepPartial<U>[] : DeepPartial<T[P]>
}

export declare type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends (infer U)[] ? DeepReadonly<U>[] : DeepReadonly<T[P]>
}

type Enumerate<N extends number, Values extends number[] = []> = Values['length'] extends N
  ? Values[number]
  : Enumerate<N, [...Values, Values['length']]>

export declare type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export declare type PickRest<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export declare type ExcludeExact<T, K extends keyof T> = Exclude<keyof T, K>

export declare type ExtractExact<T, K extends keyof T> = Extract<keyof T, K>

export declare type Toggle<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>
}[Keys]

export declare type Checkbox<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]