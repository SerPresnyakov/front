import {Schema} from "../../Schema";

class fieldCtrl{
    data={};
    constructor(private $scope){
        this.data = {scope:$scope.filterFieldsVM};
        delete(this.$scope)
    }
    wrapper = "FilterWrapper";

}

class Ctrl {

    static $inject = ["$scope"];
    constructor(public $scope){
        $scope.$watch(function(scope) { return scope["filterFieldsVM"].filters.length; },(newVal, oldVal, scope)=>{
            scope["filterFieldsVM"].test = Schema.getSchema(scope["filterFieldsVM"].filters, scope["filterFieldsVM"].rels, scope["filterFieldsVM"].rest)
        })
    }
    res;
    test;
    filters;
    refreshPage:()=>void;

    remove(index) {
        if(index>=0){
            this.filters.splice(index, 1);
            this.refreshPage();

        }else {
            console.log("index isnt spesify")
        }

    }

    test1 = new fieldCtrl(this.$scope);

    submit(){
        Object.getOwnPropertyNames(this.res).forEach(r =>{
            angular.forEach(this.filters,(f)=>{
                if(r==f.name){
                    f['value'] = this.res[r];
                 }
            })
        });
        this.refreshPage();
        console.log("submit");
    };
}

export const filterFieldsDirective= {
    name: "filterFields",
    config: {
        bindings:{
            fields: "=",
            filters: "=",
            rels: "=",
            rest: "=",
            refreshPage: "&"
        },
        controller: Ctrl,
        controllerAs: "filterFieldsVM",
        template: require<string>("./filterFields.html"),
        restrict: "E"
    }
};