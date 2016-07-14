export class Config {

    static $inject = [
        "$urlRouterProvider",
        "$mdThemingProvider",
        "$mdIconProvider"
    ];

    constructor(
      $url: ng.ui.IUrlRouterProvider,
      $theming: ng.material.IThemingProvider,
      $icon: ng.material.IIconProvider
    ) {
        $url.when("", ['localStorageService', '$state',(localStorage: ng.local.storage.ILocalStorageService, state:ng.ui.IStateService)=>{
            state.transitionTo("index", {connName:"test"})
        }]);
        $url.when("/",['localStorageService', '$state',(localStorage: ng.local.storage.ILocalStorageService, state:ng.ui.IStateService)=>{
            state.transitionTo("index", {connName:"test2"})
        }]);
    }

}