
export type Combine<T> = {
  [K in keyof T]: T[K]
} & {}

export type Select<
  TSelect extends object,
  TFrom extends { [k in keyof TSelect]: any },
> = {
  [P in Extract<keyof TFrom, keyof TSelect>]: TFrom[P]
} & {}

export type Subtract<
  TSubtract extends object,
  TFrom extends { [k in keyof TSubtract]: any },
> = {
  [P in Exclude<keyof TFrom, keyof TSubtract>]: TFrom[P]
} & {}

export type Difference<
  T1 extends object,
  T2 extends object,
> = Combine<
  & { [K in Exclude<keyof T1, keyof T2>]: T1[K] }
  & { [K in Exclude<keyof T2, keyof T1>]: T2[K] }
>

export type Intersection<
  T1 extends object,
  T2 extends object,
> = Combine<
  & { [K in Exclude<keyof T2, keyof Difference<T1, T2>>]: T2[K] }
>

export type Merge<
  T1 extends object,
  T2 extends object,
> = Combine<
  & Difference<T1, T2>
  & Intersection<T1, T2>
>

export type Override<
  TFields extends object,
  TFrom extends { [K in keyof TFields]: any },
> = Combine<
  & { [K in Exclude<keyof TFrom, keyof Intersection<TFrom, TFields>>]: TFrom[K] }
  & { [K in Exclude<keyof TFields, keyof Difference<TFrom, TFrom>>]: TFields[K] }
>

export type Extend<
  TFields extends object,
  TFrom extends object,
> = Combine<
  & { [K in Exclude<keyof TFrom, keyof Intersection<TFrom, TFields>>]: TFrom[K] }
  & { [K in Exclude<keyof TFields, keyof Difference<TFrom, TFrom>>]: TFields[K] }
>

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

export type TypeOmit<T, K extends T> = Exclude<T, K> & string

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

export type KeysSelector<T extends object> = Checkbox<{
  [K in ObjectKeys<T>]: true
}>
