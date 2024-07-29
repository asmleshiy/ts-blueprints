import { Mutable } from "../utils"

export function fromJson<T extends object> (value: string, factory?: (args: any) => T): T | undefined {
  try {
    const entry = JSON.parse(value)
    return factory?.(entry) ?? entry
  }
  catch {}
}

export function toJson<T extends object> (value: T): string | undefined {
  try {
    return JSON.stringify(value)
  }
  catch {}
}

export function deepCopy<T extends object> (data: T): T | undefined {
  if (typeof data === 'object') {
    const json = toJson(data)
    if (json) {
      return fromJson<T>(json)
    }
  }
}

export const isNil = (value: unknown): value is (null | undefined) => value === null || value === undefined

export const exact = <T extends object> (arg: T): T => arg

export const mutating = <T extends object> (arg: T): Mutable<T> => arg as Mutable<T>
