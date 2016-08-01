

class fieldCtrl{
    data = {};
    wrapper = "FilterWrapper";

    constructor(private filters){
        this.data = {scope:filters};
        delete(this.filters)
    }
}

class Ctrl {

    static $inject = ["$scope", "$state", "localStorageService", "$mdDialog", ak.jsonDaoModule.Deps.daoFactoryService, "$q", ak.authModule.authServiceName];

    filter : ak.crudTableModule.filters.iFilterClass;
    refreshPage:()=>void;
    options = {
        data:this.filter,
        wrapper:"FilterWrapper"
    };
    savedFilter:ak.crudTableModule.filters.ISavedFilters;
    savedFilters: ak.crudTableModule.filters.ISavedFilters[]=[];
    filtersSource:ak.jsonDaoModule.iSource<any>;
    tables:ak.jsonDaoModule.iSource<any>;

    constructor(public $scope: ng.IScope,
                public state:ng.ui.IStateService,
                public localStorage:angular.local.storage.ILocalStorageService,
                public $mdDialog:angular.material.IDialogService,
                public daoFactory: ak.jsonDaoModule.iDAOFactoryService,
                public $q:ng.IQService,
                public auth
    ){
        this.filtersSource = daoFactory.build("savedFilter", "/api/admin/table");
        this.tables =  daoFactory.build("table", "/api/admin/table");
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

    getSavedFilters():ng.IPromise<ak.crudTableModule.filters.ISavedFilters[]>{
        let defer = this.$q.defer<ak.crudTableModule.filters.ISavedFilters[]>();
        this.filtersSource.getFullPage({fields:[{field:"base.table.url", op:"eq",value:this.filter.tableUrl}]},[{name:"table"}])
            .then((res)=>defer.resolve(res.data));
        return defer.promise;
    }

    removeSavedFilters(filter:ak.crudTableModule.filters.ISavedFilters):void{
        console.log(filter);
        this.filtersSource.remove({id:filter.id})
            .then((res)=>{
                this.filter.saveFilter.searchText = null;
                this.filter.saveFilter.selectedItem = null;
                this.filter.savedFilters = this.filter.savedFilters.filter((item)=>{
                    return item.name != filter.name;
                })
            })
    }

    updateSavedFilters(filter:ak.crudTableModule.filters.ISavedFilters):void{
        let data ={
            id:filter.id,
            name:filter.name,
            filters: this.getFilter(this.filter.model)
        };
        this.filtersSource.update(data)
    }

    showPrompt(ev):void{
        let tableId;
        let userId;
        this.auth.me()
            .then((res)=>{
                userId = res.id;
            })
            .then(()=>{
                this.tables.getOne({fields:[{field:"base.url", op:"like", value: this.state.params["name"]}]})
                    .then((res)=>{
                        tableId = res.id;
                    })
            })
            .then(()=>{
                var confirm = this.$mdDialog.prompt()
                    .title('Введите название фильтра:')
                    .placeholder('Название фильтра')
                    .ariaLabel('Название фильтра')
                    .targetEvent(ev)
                    .ok('Создать')
                    .cancel('Отменить');

                this.$mdDialog.show(confirm).then((result)=> {
                    this.filtersSource.create({
                        tableId:tableId,
                        userId:userId,
                        name:result,
                        filters:this.getFilter(this.filter.model)
                    }).then(()=>{
                        this.filtersSource.getOne({fields:[{field:"base.name", op:"eq", value:result}]}).then((res)=>{
                            console.log("saveFilt: ",res);
                            this.filter.savedFilters.push(res);
                            this.filter.saveFilter.searchText = res.name;
                            this.filter.saveFilter.selectedItem = res;
                            console.log(this.filter.saveFilter.selectedItem);
                        })
                    })
                });
        });

        // Appending dialog to document.body to cover sidenav in docs app

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

export const filterFieldsDirective: ak.config<ng.IComponentOptions> = {
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