class Ctrl {
    static $inject = ["$mdDialog"];
    constructor(public $mdDialog) {
    }

    filters;

    originatorEv;
    openMenu = function($mdOpenMenu, ev) {
        this.originatorEv = ev;
        $mdOpenMenu(ev);
    };

    createFilter(field){
        let res = {};
        res["name"] = field.name;
        res["title"] = field.title;
        res["type"] = field.fieldType.type;
        res["value"] = "";
        this.filters.push(res);
    }
}

export const filterButtonDirective= {
    name: "filterButton",
    config: {
        bindings:{
            fields: "=",
            filters: "="
        },
        controller: Ctrl,
        controllerAs: "filterButtonVM",
        template: require<string>("./filterButton.html"),
        restrict: "E"
    }
};