import {Schema} from "../../Schema";
import {Helper} from "../Helper";
import iRegisterMeta = ak.utils.iRegisterMeta;

class fieldCtrl{
    data = {};
    wrapper = "FilterWrapper";

    constructor(private filters){
        this.data = {scope:filters};
        delete(this.filters)
    }
}

class Ctrl {

    static $inject = ["$scope", "$state", "localStorageService", "$mdDialog", Deps.daoFactoryService, "$q"];

    filter : filtersDts.iFilterClass;
    refreshPage:()=>void;
    options = {
        data:this.filter,
        wrapper:"FilterWrapper"
    };
    savedFilter:filtersDts.ISavedFilters;
    savedFilters: filtersDts.ISavedFilters[]=[];
    filtersSource:jsonDAO.iSource<ISavedFilters>;

    constructor(public $scope: ng.IScope,
                public state:ng.ui.IStateService,
                public localStorage:angular.local.storage.ILocalStorageService,
                public $mdDialog:angular.material.IDialogService,
                public daoFactory: jsonDAO.iDAOFactoryService,
                public $q:ng.IQService

    ){
        this.filtersSource = daoFactory.build("savedFilter",ApiUrls.admin);
        this.getSavedFilters().then((res)=>this.filter.savedFilters=res);

        if(state.params["filters"]){
            this.filter.getParamsFilters(state.params["filters"]);
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

    getSavedFilters():IPromise<ISavedFilters[]>{
        let defer = this.$q.defer<ISavedFilters[]>();
        this.filtersSource.getFullPage([{field:"base.table.url", op:"eq",value:this.filter.tableUrl}])
            .then((res)=>defer.resolve(res.data));
        return defer.promise;
    }

    removeSavedFilters(filter:ISavedFilters):void{
        console.log(filter);
        this.filtersSource.remove({id:filter.id})
    }

    updateSavedFilters(filter:ISavedFilters):void{
        let data ={
            id:filter.id,
            name:filter.name,
            filters: this.getFilter(this.filter.model)
        };
        this.filtersSource.update(data)
    }

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
            this.filtersSource.update({
                name:result,
                filters:this.getFilter(this.filter.model)
            });
            console.log(result,this.filter.model)
        });
    };

    getFilter(model:{}):any[]{
        let res = [];
        Object.getOwnPropertyNames(model).forEach((f)=>{
            res.push({field:f,op:"eq",value:model[f]});
        });
        return res;
    }



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