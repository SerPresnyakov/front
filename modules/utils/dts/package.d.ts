declare module ak.utils {

    interface iDeps {
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

    interface iApiUrls {
        admin: string
        crud: string
    }

    interface iModules {
        crudTable: string
        auth: string
        apiAdmin: string
        jsonDAO: string
    }

    interface iRegisterMeta<T> {
        name: string
        config: T
    }

    interface iAngularModuleConstructor {
        new (moduleName: string, deps: string[]): iAngularModule
    }

    interface iAngularModule {

        module: ng.IModule

        getModuleName(): string

        registerStates(states: iRegisterMeta<ng.ui.IState>[]): void

        registerComponent(components: iRegisterMeta<ng.IComponentOptions>[]): void

        registerDirective(directive: iRegisterMeta<() => ng.IDirective>): void

        registerFilter(filter: iRegisterMeta<() => (input: string) => string>): void

        registerServices(services: iRegisterMeta<Function>[]): void

        directive(name: string, inlineAnnotatedFunction: any[]): void

        config(initializationFunction: Function): void

        run(initializationFunction: Function): void

    }

}



