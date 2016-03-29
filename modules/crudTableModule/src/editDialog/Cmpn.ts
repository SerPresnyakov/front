import {CrudTableConfig} from "../CrudTableConfig";
import {Schema} from "../Helper";
import IDialogService = angular.material.IDialogService;

class Ctrl {

    static $inject = [ "config", "original", "source" , "$http", "$mdDialog" ];

    schema: any;
    from: string;
    res:any;
    url;

    constructor(public config: CrudTableConfig,public original , public source, public $http:ng.IHttpService, public $mdDialog:IDialogService) {

        this.schema = Schema.getSchema(config.fields, config.rels, config.rest);
        this.url = config.url;
        this.res = angular.copy(original);

    }

    submit(){
        this.source.patch(this.res.id, this.res).then((res)=>{
            console.log(res);
            if(res){
                this.$mdDialog.hide()
            }
        })
    }

}


export function getDialog( config: CrudTableConfig, original, source): ng.material.IDialogOptions {
    var parentEl = angular.element(document.body);
    return {
        parent: parentEl,
        template: require<string>("./Template.html"),
        controller: Ctrl,
        controllerAs: "vm",
        clickOutsideToClose: true,
        locals: {
            config: config,
            original: original,
            source: source
        }
    }
}