export class Run {

    static $inject = ["$rootScope", "$state"];

    constructor($rootScope: any, state: ng.ui.IStateService) {
        $rootScope.state = state;
    }

}