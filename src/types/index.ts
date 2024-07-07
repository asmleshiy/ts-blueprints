
export type Dictionary<TKey extends string, TValue> = {
  [key in TKey]?: TValue
}

type Enumerate<N extends number, Values extends number[] = []> = Values['length'] extends N
  ? Values[number]
  : Enumerate<N, [...Values, Values['length']]>

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export type PercentType = IntRange<0, 101>

export type Enum<T = string | number | boolean> = Record<Capitalize<string>, T>
