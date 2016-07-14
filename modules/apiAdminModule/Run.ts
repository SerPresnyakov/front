export class Run {

    static $inject = ["localStorageService", "$urlRouterProvider"];

    constructor(localStorage: ng.local.storage.ILocalStorageService, $url: ng.ui.IUrlRouterProvider) {
        console.log("test");
        console.log(JSON.parse(localStorage.get<string>("connName")));
        if(JSON.parse(localStorage.get<string>("connName")).name){
            $url.when("/",`/${JSON.parse(localStorage.get<string>("connName")).name}`);
        }
    }

}