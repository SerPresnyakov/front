import {Schema} from "../../Schema";
import {Helper} from "../Helper";

class fieldCtrl{
    data = {};
    wrapper = "FilterWrapper";

    constructor(private $scope){
        this.data = {scope:$scope.filterFieldsVM};
        delete(this.$scope)
    }
}

class Ctrl {

    static $inject = ["$scope","$state"];

    fields;
    res;
    schema:iFieldGroup[];
    filters;
    refreshPage:()=>void;
    options = new fieldCtrl(this.$scope);

    constructor(public $scope,public state){
        //$scope.$watch(function(scope) { return scope["filterFieldsVM"].filters.length; },(newVal, oldVal, scope)=>{
        //    scope["filterFieldsVM"].schema = Schema.getSchema(scope["filterFieldsVM"].filters, scope["filterFieldsVM"].rels)
        //});
        //
        //if(state.params.filters) {
        //    this.res = JSON.parse(state.params.filters);
        //    $scope.$watch(function(scope) { return scope["filterFieldsVM"].fields.length; },(newVal, oldVal, scope)=>{
        //        Object.getOwnPropertyNames(this.res).forEach(r =>{
        //            angular.forEach(this.fields,(f)=>{
        //                if(r === f.name){
        //                    this.createFilter(f);
        //                }
        //            });
        //        });
        //        console.log("филды появились")
        //    });
        //}
    }

    //remove(index,name) {
    //    if(index>=0){
    //        delete this.res[name];
    //        this.filters.splice(index, 1);
    //        if(JSON.stringify(this.res)!=JSON.stringify({})){
    //            this.state.params.filters = JSON.stringify(this.res);
    //        }else{
    //            this.state.params.filters = null;
    //
    //        }
    //        this.state.go(this.state.current.name,this.state.params);
    //        this.refreshPage();
    //    }else {
    //        console.log("index isnt spesify")
    //    }
    //}
    //
    //
    //
    //createFilter(field) {
    //    Helper.createFilter(field,this.filters);
    //}
    //
    //submit(){
    //    Object.getOwnPropertyNames(this.res).forEach(r =>{
    //        angular.forEach(this.filters,(f)=>{
    //            if(r==f.name){
    //                f['value'] = this.res[r];
    //             }
    //        })
    //    });
    //    this.state.params.filters = JSON.stringify(this.res);
    //    this.state.go(this.state.current.name,this.state.params);
    //    this.refreshPage();
    //};
}

export const filterFieldsDirective = {
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
        restrict: "E",
        link:(scope)=>{
            console.log(scope)
        }
    }
};