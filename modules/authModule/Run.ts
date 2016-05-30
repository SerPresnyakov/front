import IState = ng.ui.IState
import {AuthService} from "./AuthService";

function isTokenForm(t: string): boolean {
  return t.match(/^\d+:.*/) != null
}

export class Run {

  static $inject = ["$state", "$rootScope", "localStorageService", "$http", AuthService.serviceName];

  constructor($state: ng.ui.IStateService,
              $rootScope: ng.IRootScopeService,
              localStorage: ng.local.storage.ILocalStorageService,
              $http: ng.IHttpProvider) {

    let token = localStorage.get<string>("token");

    if (token != null && isTokenForm(token)) {
      $http.defaults.headers.common['token'] = token
    } else {
      $state.go("login");
    }

    $rootScope.$on("$stateChangeError", (e:ng.IAngularEvent, toState:IState, p1:any, fromState:IState, p2:any, error:any) => {

      console.log("state change error");

      if (error.err.status == 401) {
        console.debug("authModule: go to login");
        $state.go("login", {from: toState.name});
      } else {
        console.debug("authModule: go to badGateway", error);
        $state.go("badGateway", {from: toState.name})
      }

      e.preventDefault();

    });


  }
}
