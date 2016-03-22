import {Templater} from "./Templater";
import {CrudTableConfig} from "./CrudTableConfig";
import {CrudTableCtrl} from "./CrudTableCtrl";

interface CtrlScope extends ng.IScope {
    config: CrudTableConfig
    tmpl: string
}

export function CrudTableDirective($compile: ng.ICompileService): ng.IDirective {
    return {
        scope: {
            config: "=",
            tmpl: "="
        },
        controller: CrudTableCtrl,
        controllerAs: "vm",
        restrict: "E",
        link: (scope: CtrlScope, elem: ng.IAugmentedJQuery, attrs: any, ctrl: CrudTableCtrl) => {

            console.log("linking");

            let templ = "not found";

            let config = scope.config;

            if (scope.tmpl == "adGroups") {
                templ = require<string>("../../tables/AdgroupTemplate.html")
            } else {
                templ = new Templater(config, "vm").getTemplate()
            }

            elem.html(templ);
            $compile(elem.contents())(scope);
            ctrl.init(config)

        }
    }

}