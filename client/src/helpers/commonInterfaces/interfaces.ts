export type Nullable<T> = null | T
export type InferType<T> = T extends { [key: string]: infer U } ? U : any
