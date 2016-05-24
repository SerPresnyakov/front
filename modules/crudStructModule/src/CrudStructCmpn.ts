import {CrudStructCtrl} from "./CrudStructCtrl";
import {CrudStructConfig} from "./CrudStructConfig";
import {SideNavTemplater} from "./../../crudTableModule/src/SideNavTemplater";

interface CtrlScope extends ng.IScope {
    config: CrudStructConfig
    tmpl: string
}

export function CrudStructDirective($compile: ng.ICompileService): ng.IDirective {
    return {
        scope: {
            config: "=",
            tmpl: "="
        },
        controller: CrudStructCtrl,
        controllerAs: "vm",
        restrict: "E",
        link: (scope: CtrlScope, elem: ng.IAugmentedJQuery, attrs: any, ctrl: CrudStructCtrl) => {

            console.log("linking");

            let templ = "not found";

            let config = scope.config;

            templ = new SideNavTemplater(config, "vm").getTemplate();

            elem.html(templ);
            $compile(elem.contents())(scope);
            ctrl.init(config)
        }
    }

}