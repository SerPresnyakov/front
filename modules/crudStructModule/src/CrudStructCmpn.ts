import {CrudStructCtrl} from "./CrudStructCtrl";
import {CrudStructConfig} from "./CrudStructConfig";
import {Templater} from "./Templater";

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

            templ = new Templater(config, "vm").getTemplate();

            elem.html(templ);
            $compile(elem.contents())(scope);
            ctrl.init(config)
        }
    }

}