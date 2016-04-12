export class Run {

    static $inject = ["$rootScope", "$state"];

    constructor($rootScope, state: ng.ui.IStateService) {

        $rootScope.state = state;

        $rootScope.toState = (stateName: string): void => {
            if ($rootScope.system != null) {
                state.go(stateName.replace(/direct|adwords/, $rootScope.system))
            } else {
                state.go(stateName)
            }
        };

        $rootScope.$on('$stateChangeSuccess', (e: ng.IAngularEvent, toState: ng.ui.IState) => {

            if (toState.name.indexOf('direct') != -1) {
                //noinspection TypeScriptValidateTypes
                $rootScope.system = "direct"
            } else if (toState.name.indexOf('adwords') != -1) {
                //noinspection TypeScriptValidateTypes
                $rootScope.system = "adwords"
            }

        })

    }

}