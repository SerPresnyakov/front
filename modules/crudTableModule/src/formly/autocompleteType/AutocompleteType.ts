class Ctrl {

    static $inject = [ "$http", "$scope","localStorageService", ak.jsonDaoModule.Deps.daoFactoryService, "$q"];

    selectedItem: any;
    searchText: string;
    token:string;
    RelSource: ak.jsonDaoModule.iSource<any>;

    constructor(
        public $http: ng.IHttpService,
        public scope,
        public localStorage: ng.local.storage.ILocalStorageService,
        public daoFactory: ak.jsonDaoModule.iDAOFactoryService,
        public $q
    ) {
        this.RelSource = this.daoFactory.build(scope.options.data.rels, scope.options.data.dao);

        this.getDefaultValue(scope).then((res)=>{
                scope.searchText = res.name;
            }).catch((err)=>{err})
        scope.querySearch=(value:string)=>{
            if (value) {
                let defer = this.$q.defer();
                this.RelSource.getFullPage([{field: "name", op: "eq", value: value}])
                    .then((res)=> {
                        defer.resolve(res.data)
                    })
                    .catch((err)=> {
                        defer.reject(err)
                    });
                return defer.promise;
            }
        };

        scope.selectedItemChange = (item) =>{
            console.log("chaneged");
            if(item) {
                scope.model[scope.options.key] = item.id
            }
            else{
                scope.model[scope.options.key] = "";
            }
        };

        scope.options.resetModel = () => {
            ak.utils.Helper.nullObj(scope.model);
            scope.searchText = "";
        };

    }

    getDefaultValue(scope):angular.IPromise<any>{
        let defer = this.$q.defer();
        if(scope.model[scope.options.key]){
            this.RelSource.getById(scope.model[scope.options.key])
                .then((res)=> {
                    defer.resolve(res)
                })
                .catch((err)=> {
                    defer.reject(err)
                });

        }else{
            defer.reject({msg:"Default value isn't specify"})
        }
        return defer.promise;
    }

    finish($event){

    }

}

export const AutocompleteType: AngularFormly.ITypeOptions = {
    name: 'autocomplete',
    template: require<string>("./template.html"),
    controller: Ctrl
};