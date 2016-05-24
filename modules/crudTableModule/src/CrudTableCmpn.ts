import {Templater} from "./Templater";
import {SideNavTemplater} from "./SideNavTemplater";
import {FieldTableTemplater} from "./FieldTableTemplater";
import {CrudTableConfig} from "./CrudTableConfig";
import {CrudTableCtrl} from "./CrudTableCtrl";
import {ConfigBuilder} from "./ConfigBuilder";
import {Source} from "../../dao/Source";
import {Page} from "../../dao/Page";

interface CtrlScope extends ng.IScope {
    type: string
    config: CrudTableConfig
}

export function CrudTableDirective($compile: ng.ICompileService): ng.IDirective {
    return {
        scope: {
            type: "=",
            config:"=",
        },
        controller: CrudTableCtrl,
        controllerAs: "vm",
        restrict: "E",
        link: (scope: CtrlScope, elem: ng.IAugmentedJQuery, attrs: any, ctrl: CrudTableCtrl) => {

            let templ = "not found";

            ctrl.init(scope.config);

            if(scope.type == "sidenav") {
                templ = new SideNavTemplater(scope.config, "vm").getTemplate();
            } else if(scope.type == "struct") {
                templ = new FieldTableTemplater(scope.config, "vm").getTemplate();
            } else if(scope.type == "table") {
                templ = new Templater(scope.config, "vm").getTemplate();
            }
            elem.html(templ);
            $compile(elem.contents())(scope);

        }
    }
}