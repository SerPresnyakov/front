import {Schema} from "../../Schema";

class fieldCtrl{
    data = {};

    constructor(private $scope){
        this.data = {scope:$scope.filterFieldsVM};
        delete(this.$scope)
    }
    wrapper = "FilterWrapper";

}

class Ctrl {

    static $inject = ["$scope","$state"];

    constructor(public $scope,public state){
        $scope.$watch(function(scope) { return scope["filterFieldsVM"].filters.length; },(newVal, oldVal, scope)=>{
            scope["filterFieldsVM"].schema = Schema.getSchema(scope["filterFieldsVM"].filters, scope["filterFieldsVM"].rels)
        });
        if(state.params.filters) {
            this.res = JSON.parse(state.params.filters);
        }

    }

    res;
    schema:iFieldGroup[];
    filters:iFilter[];
    refreshPage:()=>void;

    remove(index) {
        if(index>=0){
            this.filters.splice(index, 1);
            this.refreshPage();

        }else {
            console.log("index isnt spesify")
        }
    }

    options = new fieldCtrl(this.$scope);

    submit(){
        Object.getOwnPropertyNames(this.res).forEach(r =>{
            angular.forEach(this.filters,(f)=>{
                if(r==f.name){
                    f['value'] = this.res[r];
                 }
            })
        });
        this.state.params.filters = JSON.stringify(this.res);
        this.state.go(this.state.current.name,this.state.params);
        this.refreshPage();
        console.log(JSON.stringify(this.res));
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