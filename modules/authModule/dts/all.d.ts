declare var authModule: auth.authService;

declare namespace auth {
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