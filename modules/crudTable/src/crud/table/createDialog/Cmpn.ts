import {CrudTableConfig} from "../CrudTableConfig";
import {Helper} from "../Helper";

class Ctrl {

    static $inject = ["config"];

    schema: any;
    form = ["*"];

    constructor(config: CrudTableConfig) {

        this.schema = Helper.getSchema(config.fields)

    }

}

export function getDialog($event: any, config: CrudTableConfig): ng.material.IDialogOptions {
    var parentEl = angular.element(document.body);
    return {
        parent: parentEl,
        template: require<string>("./Template.html"),
        controller: Ctrl,
        controllerAs: "vm",
        clickOutsideToClose: true,
        locals: {
            config: config
        },
        targetEvent: $event
    }
}

