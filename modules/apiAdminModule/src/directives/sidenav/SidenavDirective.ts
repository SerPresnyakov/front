import {SideNavTemplateBuilder} from "./SideNavTemplateBuilder";
import IScope = angular.IScope;

interface SidenaveScope extends IScope {
    tables: ak.apiAdminModule.iTable[]
}

export class SidenavDirective implements ng.IDirective {

    scope: {
        tables: "="
    };

    restrict: "E";

    constructor(
        private $compile: ng.ICompileService
    ) {}

    link = (scope: SidenaveScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes ) => {
        let tables = scope.tables;
        let template = new SideNavTemplateBuilder(tables).getTemplate();
        element.html(template);
        this.$compile(element.contents())(scope)
    };

    static factory(): ng.IDirectiveFactory {
        let directive = ($compile: ng.ICompileService) => new SidenavDirective($compile);
        directive.$inject = ["$compile"];
        return directive
    }

}