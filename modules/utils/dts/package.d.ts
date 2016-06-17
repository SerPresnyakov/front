declare var require: {
    <T>(path: string): T
    (paths: string[], callback: (...modules: any[]) => void): void
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void
};

declare module ak {

    interface config<T> {
        name: string
        config: T
    }

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

    interface uiHelper {
        registerStates(module: ng.IModule, states: config<ng.ui.IState>[]): void
    }

    interface iAngularModule {

        module: ng.IModule

        getModuleName(): string

        registerStates(states: config<ng.ui.IState>[]): void

        registerComponent(components: config<ng.IComponentOptions>[]): void

        registerDirective(directive: config<() => ng.IDirective>): void

        registerFilter(filter: config<() => (input: string) => string>): void

        registerServices(services: config<Function>[]): void

        directive(name: string, inlineAnnotatedFunction: any[]): void

        config(initializationFunction: Function): void

        run(initializationFunction: Function): void

    }

}



