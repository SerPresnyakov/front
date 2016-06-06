import {TableField} from "../../models/TableField";
import IComponentOptions = angular.IComponentOptions;

class Ctrl {

    fields : TableField;
    filter;
    originatorEv;
    fieldsLength = this.fieldsCount();
    refreshPage:()=>void;
    saveFilter={};

    constructor() {
    }

    openMenu($mdOpenMenu, ev) {
        this.originatorEv = ev;
        $mdOpenMenu(ev);
    };

    selectFilter(filter){
        if(filter) {
            let res;
            this.filter.savedFilters.forEach((f)=> {
                if (f.name == filter) {
                    res = f.model;
                }
            });
            this.filter.getParamsFilters(res);
            this.refreshPage();
            console.log(res);
        }else{
            this.filter.resetFilter();
            this.filter.saveFilter["selectedItem"] = null;
            this.refreshPage();

        }
    }

    //selectText(){
    //    console.log("set");
    //    var quest = angular.element(document.querySelector(".md-virtual-repeat-container"));
    //    quest.css('height','120px');
    //    console.log(quest)
    //}

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

export const filterButtonDirective: iRegisterMeta<IComponentOptions> = {
    name: "filterButton",
    config: {
        bindings: {
            fields: "=",
            filter: "=",
            refreshPage: "&"
        },
        controller: Ctrl,
        controllerAs: "filterButtonVM",
        template: require<string>("./filterButton.html")
    }
};