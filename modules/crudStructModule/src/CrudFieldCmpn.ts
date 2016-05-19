import {CrudStructCtrl} from "./CrudStructCtrl";
import {CrudStructConfig} from "./CrudStructConfig";
import {SideNavTemplater} from "./SideNavTemplater";
import {FieldTableTemplater} from "./FieldTableTemplater";
import {getConfig} from "./getConfig";

interface CtrlScope extends ng.IScope {
    config: CrudStructConfig
    tmpl: string
    tableName: string
}

export function CrudFieldDirective($compile: ng.ICompileService): ng.IDirective {
    return {
        scope: {
            tableName:"=",
            config: "="
        },
        controller: CrudStructCtrl,
        controllerAs: "vm",
        restrict: "E",
        link: (scope: CtrlScope, elem: ng.IAugmentedJQuery, attrs: any, ctrl: CrudStructCtrl) => {

            console.log("linking");

            let templ = "not found";
            ctrl.init(scope.config)
                .then((res)=> console.log(res, "test"));

            getConfig.get(ctrl.pager, scope.tableName).then(config => {
                //let config = scope.config;
                //console.log(scope.vm.stateParams);
                templ = new FieldTableTemplater(config, "vm").getTemplate();

                elem.html(templ);
                $compile(elem.contents())(scope);
            })

        }
    }

}