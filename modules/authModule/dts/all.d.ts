declare namespace ak.authModule {

    interface credentials {
        email: string,
        password: string
    }
}

declare module ak {
    interface authModule{
        name:string;
        authServiceName:string
    }
    var authModule:authModule;
}