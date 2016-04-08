import {Schema} from "../../Schema";
import {Helper} from "../Helper";

class fieldCtrl{
    data = {};
    wrapper = "FilterWrapper";

    constructor(private filters){
        this.data = {scope:filters};
        delete(this.filters)
    }
}

class Ctrl {

    static $inject = ["$scope","$state"];

    filter;
    refreshPage:()=>void;
    options = {
        data:this.filter,
        wrapper:"FilterWrapper"
    };

    constructor(public $scope,public state){
        if(state.params.filters){
            this.filter.getParamsFilters(state.params.filters);
        }

        this.filter.remove=(index,name)=>{
            this.filter.removeField(index,name);
            if(JSON.stringify(this.filter.model)!=JSON.stringify({})){
                this.state.params.filters = JSON.stringify(this.filter.model);
            }else{
                this.state.params.filters = null;
            }
            this.state.go(this.state.current.name,this.state.params);
            this.refreshPage();
        }
    }

    submit(){
        this.state.params.filters = JSON.stringify(this.filter.model);
        this.state.go(this.state.current.name,this.state.params);
        this.refreshPage();
    };
}

export const filterFieldsDirective = {
    name: "filterFields",
    config: {
        bindings:{
            filter: "=",
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