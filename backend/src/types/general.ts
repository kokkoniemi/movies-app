export interface ParsedQs { [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[] }

export type Data<
    T extends string | number | symbol = string,
    K = string | number | null
    > = Record<T, K>;
