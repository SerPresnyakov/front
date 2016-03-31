import {Helper} from "../../../../utils/Helper";

class Ctrl {

    static $inject = [ "$http", "$scope"];

    selectedItem: any;
    searchText: string;

    constructor(
        public $http: ng.IHttpService,
        public scope
    ) {
        if(scope.model[scope.options.key]){
            scope.searchText = scope.model._relations[scope.options.data.rels].name;
        }
        scope.querySearch = (text: string) => {
            return this.$http.get(scope.options.data.dao, {
                params: {
                    filter: `name_like_${text}`,
                    token: `1:6273543320`
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