export class Run {

    static $inject = ["localStorageService", "$mdIconProvider"];

    constructor(localStorage: ng.local.storage.ILocalStorageService, $icon: ng.material.IIconProvider) {
        console.log("test");
        console.log(JSON.parse(localStorage.get<string>("connName")));
        //if(JSON.parse(localStorage.get<string>("connName")).name){
        //    $url.when("/",`/${JSON.parse(localStorage.get<string>("connName")).name}`);
        //}
    }

}