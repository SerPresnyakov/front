import {Helper} from "../../../../utils/Helper";

class Ctrl {

    static $inject = [ "$http", "$scope","localStorageService"];

    selectedItem: any;
    searchText: string;
    token:string;

    constructor(
        public $http: ng.IHttpService,
        public scope,
        public localStorage: ng.local.storage.ILocalStorageService
    ) {
        if(scope.options.data.dao != "/left/client" && scope.options.data.dao != "/left/pricelab/shop") {
            this.token = this.localStorage.get<string>("token");
        }
        else {
            this.token = "1:6273543320";
        }
        if (scope.model[scope.options.key]) {
            if(scope.model._relations){
                scope.searchText = scope.model._relations[scope.options.data.rels].name;
            }
            else{
                this.$http.get(scope.options.data.dao, {
                    params: {
                        filter: `id_eqN_${scope.model[scope.options.key]}`,
                    },
                    headers: {
                        token: this.token
                    }
                }).then((res:any) => scope.searchText =res.data.data[0].name);
            }
        }

        scope.querySearch = (text: string) => {
            return this.$http.get(scope.options.data.dao, {
                params: {
                    filter: `name_like_${text}`,
                },
                headers: {
                    token: this.token
                }
            }).then((res: any) => res.data.data);
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
            Helper.nullObj(scope.model);
            scope.searchText = "";
        };

    }

    finish($event){

    }

}

export const AutocompleteType: AngularFormly.ITypeOptions = {
    name: 'autocomplete',
    template: require<string>("./template.html"),
    controller: Ctrl
};