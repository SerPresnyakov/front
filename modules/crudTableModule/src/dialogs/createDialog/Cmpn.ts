import {Schema} from "../../Schema";
import IDialogService = angular.material.IDialogService;
import {Model} from "../../Model";
import iCrudTableConfig = ak.crudTableModule.CrudTableConfig;

class CreateCtrl {

    static $inject = [ "config", "$mdDialog"];

    schema: any;
    from: string;
    res:any;

    constructor(
        public config: iCrudTableConfig,
        public $mdDialog:IDialogService
    ) {
        this.schema = Schema.getSchema(config.fields, config.rels);
        this.res = Model.getModel(config.fields, config.rels);
    }

    submit() {
        this.$mdDialog.hide(this.res);
        console.log("debug: created!")
    }

}

export function getDialog($event: any, config: iCrudTableConfig): ng.material.IDialogOptions {
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

