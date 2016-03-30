class Ctrl {
    static $inject = ["$mdDialog"];
    constructor(public $mdDialog) {
    }

    originatorEv;
    openMenu = function($mdOpenMenu, ev) {
        this.originatorEv = ev;
        $mdOpenMenu(ev);
    };
}

export const filterButtonDirective: ng.IDirective= {
    name: "filterButton",
        controller: Ctrl,
        controllerAs: "vm",
        template: require<string>("./filter.html"),
        restrict: "E"


};