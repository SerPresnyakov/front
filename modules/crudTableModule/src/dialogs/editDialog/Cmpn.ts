import {Schema} from "../../Schema";
import IDialogService = angular.material.IDialogService;
import iCrudTableConfig = ak.crudTableModule.CrudTableConfig;

class Ctrl {

    static $inject = [ "config", "original", "$mdDialog" ];

    schema: any;
    from: string;
    res:any;
    url;

    constructor(public config: iCrudTableConfig, public original, public $mdDialog:IDialogService) {
        this.schema = Schema.getSchema(config.fields, config.rels);
        this.url = config.url;
        this.res = angular.copy(original);
    }

    submit():void{
        //this.source.update();
        this.$mdDialog.hide(this.res);
        //this.source.patch(this.res.id, this.res).then((res)=>{
        //    console.log(res);
        //    if(res){
        //        this.$mdDialog.hide()
        //    }
        //})
    }
}

export function getDialog(config: iCrudTableConfig, original): ng.material.IDialogOptions {
    var parentEl = angular.element(document.body);
    return {
        parent: parentEl,
        template: require<string>("./Template.html"),
        controller: Ctrl,
        controllerAs: "vm",
        clickOutsideToClose: true,
        locals: {
            config: config,
            original: original
        }
    }
}