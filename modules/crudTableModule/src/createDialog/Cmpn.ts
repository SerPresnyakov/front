import {CrudTableConfig} from "../CrudTableConfig";
import {Schema} from "../Schema";
import IDialogService = angular.material.IDialogService;
import {Model} from "../Model";

class CreateCtrl {

    static $inject = [ "config", "$http", "$mdDialog","localStorageService"];

    schema: any;
    from: string;
    res:any;
    url;
    token;

    constructor(public config: CrudTableConfig, public $http:ng.IHttpService, public $mdDialog:IDialogService, public localStorage: ng.local.storage.ILocalStorageService) {

        this.schema = Schema.getSchema(config.fields, config.rels);
        this.res = Model.getModel(config.fields, config.rels);
        this.url = config.url;
        console.log(this.url);
        if(this.url != "/left/client" && this.url != "/left/pricelab/shop") {
            this.token = this.localStorage.get<string>("token");
        }
        else {
            this.token = "1:6273543320";
        }
    }

    submit(){
        return this.$http.post(this.url,this.res,{headers: {
            token: this.token
        }}).then((res)=>{
            if(res){
                this.$mdDialog.hide()
            }

        })
    }

}

export function getDialog($event: any, config: CrudTableConfig): ng.material.IDialogOptions {
    var parentEl = angular.element(document.body);
    return {
        parent: parentEl,
        template: require<string>("./Template.html"),
        controller: CreateCtrl,
        controllerAs: "vm",
        clickOutsideToClose: true,
        locals: {
            config: config
        },
        targetEvent: $event
    }
}

