import IState = ng.ui.IState
import {Ctrl} from "./../crud/table/createDialog/Ctrl";

function isTokenForm(t: string): boolean {
  return t.match(/^\d+:.*/) != null
}

export class Run {

  static $inject = ["$state", "$rootScope", "localStorageService", "$http"];

  constructor($state:ng.ui.IStateService,
              $rootScope:ng.IRootScopeService,
              localStorage:ng.local.storage.ILocalStorageService,
              $http:ng.IHttpProvider) {

    let token = localStorage.get<string>("token");

    if (token != null && isTokenForm(token)) {

    } else {
      $state.go("login");
    }

    $rootScope.$on("$stateChangeError", (e:ng.IAngularEvent, toState:IState, p1:any, fromState:IState, p2:any, err:any) => {

      console.log("state change error");

      if (err.status == 401) {
        console.info("go to login");
        $state.go("login", {from: toState.name});
      } else {
        console.info("go to badGateway", err);
        $state.go("login", {from: toState.name})
      }

      e.preventDefault();

    });


  }
}
