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

    static $inject = ["$scope","$state","localStorageService","$mdDialog"];

    filter;
    refreshPage:()=>void;
    options = {
        data:this.filter,
        wrapper:"FilterWrapper"
    };
    test={name:"",model:{}};
    savedFilters=[];

    constructor(public $scope, public state, public localStorage, public $mdDialog){
        if(state.params.filters){
            this.filter.getParamsFilters(state.params.filters);
        } else if(localStorage.get(state.current.name)){
            console.log(localStorage.get(state.current.name));
            this.filter.savedFilters = JSON.parse(localStorage.get(state.current.name));
        }

        this.filter.remove=(index,name)=>{
            this.filter.removeField(index,name);
            if(JSON.stringify(this.filter.model)!=JSON.stringify({})){
                this.state.params.filters = JSON.stringify(this.filter.model);
                //localStorage.set(this.state.current.name, JSON.stringify(this.filter.model));
            }else{
                this.state.params.filters = null;
                //localStorage.set(this.state.current.name, null);
            }
            this.state.go(this.state.current.name,this.state.params);
            this.refreshPage();
        }
    }

    submit(){
        this.state.params.filters = JSON.stringify(this.filter.model);
        //this.localStorage.set(this.state.current.name, JSON.stringify(this.filter.model));
        this.state.go(this.state.current.name,this.state.params);
        this.refreshPage();
    };

    showPrompt(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = this.$mdDialog.prompt()
            .title('Введите название фильтра:')
            .placeholder('Название фильтра')
            .ariaLabel('Название фильтра')
            .targetEvent(ev)
            .ok('Создать')
            .cancel('Отменить');

        this.$mdDialog.show(confirm).then((result)=> {
            this.test.name = result;
            this.test.model=this.filter.model;
            this.filter.savedFilters.push(this.test);
            this.localStorage.set(this.state.current.name, JSON.stringify(this.filter.savedFilters));
            //console.log(this.test)
        });
    };

    saveFilter(){
        console.log(this.test)
    }
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