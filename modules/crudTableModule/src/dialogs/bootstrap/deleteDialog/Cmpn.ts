import iCrudTableConfig = ak.crudTableModule.CrudTableConfig;
import IModalSettings = angular.ui.bootstrap.IModalSettings;
import {Schema} from "../../../Schema";

class Ctrl {

    static $inject = [ "config", "original", "$uibModalInstance" ];

    schema: any;
    from: string;
    res:any;
    url;

    constructor(public config: iCrudTableConfig, public original, public  $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance) {
        this.schema = Schema.getSchema(config.fields, config.rels);
        this.url = config.url;
        this.res = angular.copy(original);
    }

    cancel():void{
        //this.source.update();
        this.$uibModalInstance.dismiss('cancel');
        //this.source.patch(this.res.id, this.res).then((res)=>{
        //    console.log(res);
        //    if(res){
        //        this.$mdDialog.hide()
        //    }
        //})
    }
}

export function deleteBootstrapDialog(config: iCrudTableConfig, original):IModalSettings {
    return {
        template: require<string>("./InspiniaTemplate.html"),
        controller: Ctrl,
        controllerAs: 'vm',
        resolve: {
            config: config,
            original: original
        }
    }
}