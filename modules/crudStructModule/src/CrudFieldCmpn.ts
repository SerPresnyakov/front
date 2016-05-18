import {CrudStructCtrl} from "./CrudStructCtrl";
import {CrudStructConfig} from "./CrudStructConfig";
import {SideNavTemplater} from "./SideNavTemplater";
import {FieldTableTemplater} from "./FieldTableTemplater";

interface CtrlScope extends ng.IScope {
    config: CrudStructConfig
    tmpl: string
}

export function CrudFieldDirective($compile: ng.ICompileService): ng.IDirective {
    return {
        scope: {
            config: "=",
            stateParams: "="
        },
        controller: CrudStructCtrl,
        controllerAs: "vm",
        restrict: "E",
        link: (scope: CtrlScope, elem: ng.IAugmentedJQuery, attrs: any, ctrl: CrudStructCtrl) => {

            console.log("linking");

            let templ = "not found";

            let config = scope.config;
            console.log(scope);

            templ = new FieldTableTemplater(config, "vm").getTemplate();

            elem.html(templ);
            $compile(elem.contents())(scope);
            ctrl.init(config)
        }
    }

}