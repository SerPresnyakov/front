import {FilterTemplateProvider} from "../../FilterTemplateConfig";
class Ctrl {

    static $inject = ["$scope", "$state", "$mdDialog", ak.jsonDaoModule.Deps.daoFactoryService, "$q", ak.authModule.authServiceName, "$mdToast" ];

    filter : ak.crudTableModule.filters.iFilterClass;
    refreshPage:()=>void;
    options = {
        data:this.filter,
        wrapper:"FilterWrapper"
    };
    savedFilter: ak.crudTableModule.filters.ISavedFilters;
    savedFilters: ak.crudTableModule.filters.ISavedFilters[]=[];
    filtersSource: ak.jsonDaoModule.iSource<any>;
    tables: ak.jsonDaoModule.iSource<any>;

    constructor(public $scope: ng.IScope,
                public state:ng.ui.IStateService,
                public $mdDialog:angular.material.IDialogService,
                public daoFactory: ak.jsonDaoModule.iDAOFactoryService,
                public $q:ng.IQService,
                public auth,
                public $mdToast:ng.material.IToastService
    ){
        this.filtersSource = daoFactory.build("public.saved_filter", "api/db/table/api");
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
        this.filter.resetUnappliedFilter();
        this.state.params["filters"] = JSON.stringify(this.filter.model);
        this.state.go(this.state.current.name, this.state.params);
        this.refreshPage();
    };

    getSavedFilters():ng.IPromise<ak.crudTableModule.filters.ISavedFilters[]>{
        let defer = this.$q.defer<ak.crudTableModule.filters.ISavedFilters[]>();
        this.filtersSource.getFullPage({fields:[]},[{name:"table"}])
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
            });
        this.cancelFilter();
    }

    updateSavedFilters(filter:ak.crudTableModule.filters.ISavedFilters):void{
        let data ={
            id:filter.id,
            name:filter.name,
            filters: this.getFilter(this.filter.model)
        };
        this.filtersSource.update(data)
    }

    saveFilter(name:string):void{
        let tableId;
        let userId;
        let toast;
        this.auth.me()
            .then((res)=>{
                userId = res.id;
            })
            .then(()=>{
                this.tables.getOne({fields:[{field:"base.url", op:"like", value: this.state.params["name"]}]})
                    .then((res)=>{
                        tableId = res.id;
                    })
                    .then(()=>{
                        let doc;
                        console.log(this.getFilter(this.filter.model).length)
                        if(this.getFilter(this.filter.model).length){

                            if(this.filter.saveFilter.selectedItem){
                                doc = this.filter.saveFilter.selectedItem;
                                doc.filters = this.getFilter(this.filter.model);
                                toast = "обновлен";
                            }else{
                                doc = {
                                    tableId: tableId,
                                    userId: userId,
                                    name: name,
                                    filters: this.getFilter(this.filter.model)
                                };
                                toast = "создан";
                            }
                        }else{
                            this.$mdToast.show(
                                this.$mdToast.simple()
                                    .textContent(`Выберите фильтры!`)
                                    .position("top right")
                                    .hideDelay(3000)
                            );
                        }
                        this.filtersSource.upsert(doc)
                    .then(()=>{
                        this.$mdToast.show(
                            this.$mdToast.simple()
                                .textContent(`Фильтр ${name} ${toast}!`)
                                .position("top right")
                                .hideDelay(3000)
                        );
                        this.filtersSource.getOne({fields:[{field:"base.name", op:"eq", value: name}]}).then((res)=>{
                            console.log("saveFilt: ",res);
                            this.filter.savedFilters.push(res);
                            this.filter.saveFilter.searchText = res.name;
                            this.filter.saveFilter.selectedItem = res;
                            console.log(this.filter.saveFilter.selectedItem);
                        })
                    })
                    .catch((err)=> {
                        this.$mdToast.show(
                            this.$mdToast.simple()
                                .textContent(`Фильтр с именем '${name}' уже есть !`)
                                .position("top right")
                                .hideDelay(3000)
                        );
                    })
                });
        });
    };

    cancelFilter(){
        this.filter.resetFilter();
        this.filter.saveFilter.searchText = null;
        this.filter.saveFilter.selectedItem = null;
        this.filter.saveFilterName = null;
        this.state.params["filters"] = null;
        this.state.go(this.state.current.name, this.state.params);
        this.refreshPage();
    }

    getFilter(model:{}):any[]{
        let res = [];
        Object.getOwnPropertyNames(model).forEach((f)=>{
            res.push({field:f, op:"eq", value:model[f]});
        });
        return res;
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
        template: ["FilterModuleTemplate",  (filterModuleTemplate: FilterTemplateProvider) => { return getTemplate(filterModuleTemplate)}]
    }
};

function getTemplate(filterModuleTemplate: FilterTemplateProvider):string {
    if (filterModuleTemplate.getFramework() == "material") {
        return require<string>("./MaterialFilterFields.html")
    } else if (filterModuleTemplate.getFramework() == "inspinia") {
        return require<string>("./InspiniaFilterFields.html")
    }
}
