class Ctrl {

    static $inject = [ "$http", "$scope", "localStorageService", ak.jsonDaoModule.Deps.daoFactoryService, "$q"];

    selectedItem: any;
    searchText: string;
    token: string;
    RelSource: ak.jsonDaoModule.iSource<any>;

    constructor(
        public $http: ng.IHttpService,
        public scope,
        public localStorage: ng.local.storage.ILocalStorageService,
        public daoFactory: ak.jsonDaoModule.iDAOFactoryService,
        public $q
    ) {
        this.RelSource = this.daoFactory.build(scope.options.data.dao.tableName, scope.options.data.dao.crudUrl);

        scope.getItemByName=(item)=>{
            return item[scope.options.data.dao.fieldName]
        };

        this.getDefaultValue(scope).then((res)=>{
                scope.searchText = res[scope.options.data.dao.fieldName];
            }).catch((err)=>{err});

        scope.querySearch=(value:string)=>{
            if (value) {
                let defer = this.$q.defer();
                this.RelSource.getFullPage({fields:[{field: scope.options.data.dao.fieldName, op: "like", value: value}]},[])
                    .then((res)=> {
                        defer.resolve(res.data)
                    })
                    .catch((err)=> {
                        defer.reject(err)
                    });
                return defer.promise;
            }else{
                let defer = this.$q.defer();
                this.RelSource.getFullPage(null,[])
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