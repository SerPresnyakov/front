import {CrudStructCtrl} from "./CrudStructCtrl";
import {CrudStructConfig} from "./CrudStructConfig";
import {SideNavTemplater} from "./SideNavTemplater";
import {FieldTableTemplater} from "./FieldTableTemplater";
import {getConfig} from "./getConfig";
import {Templater} from "../../crudTableModule/src/Templater";

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
            let config = scope.config;
            ctrl.init(scope.config);

            ctrl.pager.deffered.promise.then((data)=>{
                getConfig.get(data, scope.tableName, config);
                //templ = new Templater(config, "vm").getTemplate();
                //elem.html(templ);
                //$compile(elem.contents())(scope);
            });

                //.then(config => {
            //    //let config = scope.config;
            //    //console.log(scope.vm.stateParams);

            //
            //    elem.html(templ);
            //    $compile(elem.contents())(scope);
            //})

        }
    }

}