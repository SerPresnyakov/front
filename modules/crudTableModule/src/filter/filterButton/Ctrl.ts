class Ctrl {
    static $inject = ["$mdDialog"];
    constructor(public $mdDialog) {
    }
    fields;
    filters;

    originatorEv;
    openMenu = function($mdOpenMenu, ev) {
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

    fieldsLength = this.fieldsCount();

    isSet(field):boolean{
        let res = false;
        angular.forEach(this.filters,(f)=>{
            if(field.name === f.name){
                res = true;
            }
        });

        return res;
    }

    createFilter(field){
        let res = {};
        res["name"] = field.name;
        res["title"] = field.title;
        res["parent"] = field.parent;
        res["formly"] = field.formly;
        res["options"] = field.options;
        res["fieldType"]={};
        res["fieldType"].type = field.fieldType.type;
        res["value"] = "";
        this.filters.push(res);
    }
}

export const filterButtonDirective= {
    name: "filterButton",
    config: {
        bindings:{
            fields: "=",
            filters: "="
        },
        controller: Ctrl,
        controllerAs: "filterButtonVM",
        template: require<string>("./filterButton.html"),
        restrict: "E"
    }
};