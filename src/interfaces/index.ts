
export interface Constructor<T extends object> extends Function {
  new(...args: any[]): T
}

export interface PropertySelector<T extends object, K extends keyof T = keyof T> {
  (object: T): T[K]
}
export interface InstanceFactory<in out T extends object> {
  empty (): T
  from (args: T): T
}
