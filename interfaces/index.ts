
export declare interface Constructor<T extends object> extends Function {
  new(...args: any[]): T
}

export declare interface PropertySelector<T extends object, K extends keyof T = keyof T> {
  (object: T): T[K]
}
