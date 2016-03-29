import {indexState} from "./index/State"

export class Config {

    static registerStates(moduleName: string, states: iRegisterMeta<ng.ui.IState>[]) {
        angular.module(moduleName).config(["$stateProvider", ($state) => {
            angular.forEach(states, (s) => {
                $state.state(s.name, s.config);
            })
        }])
    }

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
        $url.when("", "/");
    }

}