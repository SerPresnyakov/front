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
    tableName: string
}

export function CrudTableDirective($compile: ng.ICompileService): ng.IDirective {
    return {
        scope: {
            type: "=",
            tableName:"=",
        },
        controller: CrudTableCtrl,
        controllerAs: "vm",
        restrict: "E",
        link: (scope: CtrlScope, elem: ng.IAugmentedJQuery, attrs: any, ctrl: CrudTableCtrl) => {

            let templ = "not found";

            new ConfigBuilder(ctrl.inj).build(scope.tableName, scope.type == "struct").then((config) => {
                ctrl.init(config);
                if(scope.type == "sidenav") {
                    templ = new SideNavTemplater(config, "vm").getTemplate();
                } else if(scope.type == "struct") {
                    templ = new FieldTableTemplater(config, "vm").getTemplate();
                } else if(scope.type == "table") {
                    templ = new Templater(config, "vm").getTemplate();
                }
                elem.html(templ);
                $compile(elem.contents())(scope);
            }).catch((err) => { throw { msg: "can't build config", err: err } });

        }
    }
}