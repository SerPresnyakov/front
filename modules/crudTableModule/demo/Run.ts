
export class Run {

    static $inject = ["$rootScope", "$mdSidenav", "$mdMedia","$state", "$http"];

    constructor($rootScope, sidenav: ng.material.ISidenavService, mdMedia: ng.material.IMedia, state: ng.ui.IStateService, $http:ng.IHttpProvider) {
        $http.defaults.headers.post["connName"] = "majorAdmin";
        $rootScope.$on('$stateChangeSuccess', () => {
            var nav;
            if (!mdMedia('gt-sm')) nav = sidenav("leftNav");
            if (nav && nav.isOpen()) nav.close()
        });

        //$rootScope.toState = (stateName: string): void => {
        //    if ($rootScope.system != null) {
        //        let res = stateName.replace(/direct|adwords/, $rootScope.system);
        //
        //        state.go(stateName.replace(/direct|adwords/, $rootScope.system))
        //    } else {
        //        state.go(stateName)
        //    }
        //};

        //$rootScope.$on('$stateChangeSuccess', (e: ng.IAngularEvent, toState: ng.ui.IState) => {
        //
        //    if (toState.name.indexOf('direct') != -1) {
        //        //noinspection TypeScriptValidateTypes
        //        $rootScope.system = "direct"
        //    } else if (toState.name.indexOf('adwords') != -1) {
        //        //noinspection TypeScriptValidateTypes
        //        $rootScope.system = "adwords"
        //    }
        //
        //})

    }

}