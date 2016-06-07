import {TableField} from "../../models/TableField";
import IComponentOptions = angular.IComponentOptions;
import filtersDts = crudTable.filters
import iTableField = crudTable.models.iTableField;

class Ctrl {

    fields : TableField;
    filter: filtersDts.iFilterClass;
    originatorEv:MouseEvent;
    fieldsLength = this.fieldsCount();
    refreshPage:()=>void;

    constructor() {
    }

    openMenu($mdOpenMenu, ev:MouseEvent):void {
        this.originatorEv = ev;
        $mdOpenMenu(ev);
    };

    selectFilter(savedFilterName:string):void{
        if(savedFilterName) {
            let res:filtersDts.IModel;
            this.filter.savedFilters.forEach((f)=> {
                if (f.name == savedFilterName) {
                    res = f.model;
                }
            });
            this.filter.getParamsFilters(res);
            this.refreshPage();
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

    fieldsCount():number{
        let res:number = 0;
        angular.forEach(this.fields,(f)=>{
            if(f.formly!='object'&& f.parent==null){
                res = res + 1;
            }
        });
        return res;
    };

    isSet(field:iTableField):boolean{
        let res:boolean = false;
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