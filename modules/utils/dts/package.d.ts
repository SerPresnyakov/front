declare var require: {
    <T>(path: string): T
    (paths: string[], callback: (...modules: any[]) => void): void
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void
};

declare module ak.utils {

    interface Deps {
        uiRouter: string
        fileModel: string
        ngAnimate: string
        blockUI: string
        localStorage: string
        ngClipboard: string
        ngSanitize: string
        diffMatch: string
        material: string
        mdTable: string
        angularFormly: string
        formlyMaterial: string
        ngMessages: string
    }

    interface config<T> {
        name: string
        config: T
    }

    interface uiHelper {
        registerStates(module: ng.IModule, states: config<ng.ui.IState>[]): void
    }

}



