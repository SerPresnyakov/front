import {Schema} from "../../Schema";
import filtersDts = crudTable.filters

class Ctrl {

    static $inject = ["$scope","$state","localStorageService","$mdDialog"];

    filter : filtersDts.iFilterClass;
    refreshPage:()=>void;
    options = {
        data:this.filter,
        wrapper:"FilterWrapper"
    };
    savedFilter:filtersDts.ISavedFilters={name:"",model:{}};
    savedFilters: filtersDts.ISavedFilters[]=[];

    constructor(public $scope: ng.IScope, public state:ng.ui.IStateService, public localStorage:angular.local.storage.ILocalStorageService, public $mdDialog:angular.material.IDialogService){

        if(state.params["filters"]){
            this.filter.getParamsFilters(state.params["filters"]);
        } else if(localStorage.get(state.current.name)){
            this.filter.savedFilters = JSON.parse(localStorage.get<string>(state.current.name));
        }
        this.filter.remove=(index:number, name:string)=>{
            this.filter.removeField(index,name);
            if(JSON.stringify(this.filter.model)!=JSON.stringify({})){
                this.state.params["filters"] = JSON.stringify(this.filter.model);
                this.state.go(this.state.current.name,this.state.params);
                this.refreshPage();
            }else{

                if(this.filter.exist()){
                    this.state.params["filters"] = null;
                }else{
                    this.state.params["filters"] = null;
                    this.state.go(this.state.current.name,this.state.params);
                    this.refreshPage();
                }
            }
        }
    }

    submit():void {
        this.state.params["filters"] = JSON.stringify(this.filter.model);
        this.state.go(this.state.current.name, this.state.params);
        this.refreshPage();
    };

    showPrompt(ev):void{
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = this.$mdDialog.prompt()
            .title('Введите название фильтра:')
            .placeholder('Название фильтра')
            .ariaLabel('Название фильтра')
            .targetEvent(ev)
            .ok('Создать')
            .cancel('Отменить');

        this.$mdDialog.show(confirm).then((result)=> {
            this.savedFilter.name = result;
            this.savedFilter.model= angular.copy(this.filter.model);
            this.filter.savedFilters.push(this.savedFilter);
            this.localStorage.set(this.state.current.name, JSON.stringify(this.filter.savedFilters));
        });
    };

    saveFilter():void{
        console.log(this.savedFilter)
    }
}

export const filterFieldsDirective: iRegisterMeta<ng.IComponentOptions> = {
    name: "filterFields",
    config: {
        bindings: {
            filter: "=",
            rels: "=",
            rest: "=",
            refreshPage: "&"
        },
        controller: Ctrl,
        controllerAs: "filterFieldsVM",
        template: require<string>("./filterFields.html")
    }
};