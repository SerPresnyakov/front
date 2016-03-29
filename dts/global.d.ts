declare var require: {
    <T>(path: string): T
    (paths: string[], callback: (...modules: any[]) => void): void
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void
};

declare type modalMode = "create" | "update"

declare interface iRegisterMeta<T> {
    name: string
    config: T
}

interface Array<T> {
    find(predicate: (search: T) => boolean) : T;
}
