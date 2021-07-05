// Like Record, but making props explicitly optional
export type Dictionary<K extends string, T> = { [P in K]?: T };
