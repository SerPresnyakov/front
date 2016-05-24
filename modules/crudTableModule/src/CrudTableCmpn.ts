import {Templater} from "./Templater";
import {SideNavTemplater} from "./SideNavTemplater";
import {FieldTableTemplater} from "./FieldTableTemplater";
import {CrudTableConfig} from "./CrudTableConfig";
import {CrudTableCtrl} from "./CrudTableCtrl";
import {getConfig} from "./getConfig";

interface CtrlScope extends ng.IScope {
    config: CrudTableConfig
    type: string
    tableName: string
}

export function CrudTableDirective($compile: ng.ICompileService): ng.IDirective {
    return {
        scope: {
            config: "=",
            type: "=",
            tableName:"=",
        },
        controller: CrudTableCtrl,
        controllerAs: "vm",
        restrict: "E",
        link: (scope: CtrlScope, elem: ng.IAugmentedJQuery, attrs: any, ctrl: CrudTableCtrl) => {

            console.log("linking");

            let templ = "not found";
            let config = scope.config;
            ctrl.init(scope.config);

            ctrl.pager.deffered.promise.then((data)=>{
                getConfig.get(data, scope.tableName, config);
                if(scope.type=="sidenav"){
                    templ = new SideNavTemplater(config, "vm").getTemplate();
                } else if(scope.type=="struct"){
                    templ = new FieldTableTemplater(config, "vm").getTemplate();
                } else if(scope.type=="table"){
                    templ = new Templater(config, "vm").getTemplate();
                }
                elem.html(templ);
                $compile(elem.contents())(scope);
            });
        }
    }
}