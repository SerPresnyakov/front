declare namespace ak.authModule {
    export interface authService{
        serviceName: string
        $inject:any[]
        login(cred: credentials): ng.IPromise<Boolean>
        logout(): ng.IPromise<any>
        me(): ng.IPromise<any>
    }
    interface credentials {
        email: string,
        password: string
    }
}

declare module ak {
    import authService = ak.authModule.authService;

    interface authModule{
        name:string;
        authService:authService;
    }
    var authModule:authModule;
}