import {TableField} from "../../TableField";
import {Helper} from "../Helper";

class Ctrl {

    fields : TableField;
    filter;
    originatorEv;
    fieldsLength = this.fieldsCount();

    constructor() {
    }

    openMenu($mdOpenMenu, ev) {
        this.originatorEv = ev;
        $mdOpenMenu(ev);
    };

    fieldsCount(){
        let res = 0;
        angular.forEach(this.fields,(f)=>{
            if(f.formly!='object'&& f.parent==null){
                res = res + 1;
            }
        });
        return res;
    };

    isSet(field):boolean{
        let res = false;
        angular.forEach(this.filter.filters,(f)=>{
            if(field.name === f.name){
                res = true;
            }
        });
        return res;
    };

}

export const filterButtonDirective= {
    name: "filterButton",
    config: {
        bindings:{
            fields: "=",
            filter: "="
        },
        controller: Ctrl,
        controllerAs: "filterButtonVM",
        template: require<string>("./filterButton.html"),
        restrict: "E",
        link:(scope)=>{
            console.log(scope)
        }
    }
};