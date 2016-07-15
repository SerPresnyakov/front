import {Schema} from "../../../Schema";
import IDialogService = angular.material.IDialogService;
import {Model} from "../../../Model";
import iCrudTableConfig = ak.crudTableModule.CrudTableConfig;
import IModalSettings = angular.ui.bootstrap.IModalSettings;

class CreateCtrl {

    static $inject = [ "config", "$uibModalInstance"];

    schema: any;
    from: string;
    res:any;

    constructor(
        public config: iCrudTableConfig,
        public  $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance
    ) {
        this.schema = Schema.getSchema(config.fields, config.rels);
        this.res = Model.getModel(config.fields, config.rels);
    }

    create(){
        this.$uibModalInstance.close(this.res);
    }

    //submit() {
    //    this.$mdDialog.hide(this.res);
    //    console.log("debug: created!")
    //}

}

export function getBootstrapCreateDialog(config: iCrudTableConfig):IModalSettings {
    return {
        template: require<string>("./Template.html"),
        controller: CreateCtrl,
        controllerAs: 'vm',
        resolve: {
            config: config
        }
    }
}
