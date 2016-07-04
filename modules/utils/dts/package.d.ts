declare var require: {
    <T>(path: string): T
    (paths: string[], callback: (...modules: any[]) => void): void
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void
};

declare interface Array<T> {
    find(predicate: (search: T) => boolean) : T;
}

interface angFunction {
    $inject?: string[];
}


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

    interface ApiUrls {
        admin:string,
        crud:string,
        connName:string
    }

    interface Domain {
        name:string
        config():(input:string)=>string
    }

    interface Helper {
        capitalize(v:string): string
        withPrefix(prefix:string, v:string)
        applyMixins(derivedCtor:any, baseCtors:any[])
        nullObj(obj:{})
        assignegValueOfObjElement(data, obj)
        handleNull(o:() => any): string
        getArrElementByName?(arr:any[], name:string)
    }

    interface AngularModule {

        module: ng.IModule

        getModuleName(): string

        registerStates(states: ak.config<ng.ui.IState>[]): void

        registerComponent(components: ak.config<ng.IComponentOptions>[]): void

        registerDirective(directive: ak.config<() => ng.IDirective>): void

        registerFilter(filter: ak.config<() => (input: string) => string>): void

        registerServices(services: ak.config<angFunction>[]): void

        directive(name: string, inlineAnnotatedFunction: any[]): void

        config(initializationFunction: Function): void

        run(initializationFunction: Function): void

    }

}

declare namespace ak {

    import Deps = ak.utils.Deps;
    import AngularModule = ak.utils.AngularModule;
    import ApiUrls = ak.utils.ApiUrls;
    import Helper = ak.utils.Helper;
    import Domain = ak.utils.Domain;

    interface config<T> {
        name: string
        config: T
    }

    interface Utils {
        Deps: Deps,
        angularModule: (name: string, deps: string[]) => AngularModule,
        ApiUrls: ApiUrls,
        Helper: Helper,
        Domain: Domain
    }

    var utils: Utils;

    interface uiHelper {
        registerStates(module: ng.IModule, states: config<ng.ui.IState>[]): void
    }

}



