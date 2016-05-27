import {SideNavTemplateBuilder} from "./SideNavTemplateBuilder";
import IScope = angular.IScope;

interface SidenaveScope extends IScope{
    tables: apiAdmin.iTable[]
}

export function SidenavDirective($compile:ng.ICompileService,$q:ng.IQService):ng.IDirective{
    return{
        scope:{
            tables: "=",
        },
        restrict: "E",
        link:( scope: SidenaveScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes )=>{
            let tables = scope.tables;
            let template = SideNavTemplateBuilder(tables);
            element.html(template);
            $compile(element.contents())(scope)
        }
    }
}