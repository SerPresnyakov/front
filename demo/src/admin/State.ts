import {CrudStructConfig} from "../../../modules/crudStructModule/src/CrudStructConfig";
import {table as struct} from "../tableConfigs/struct"

class Ctrl {

    static $inject = ["$mdSidenav","config", "$scope"];

    constructor(
        private sidenav: ng.material.ISidenavService, config, s
    ) {
        s['config'] = config
    }

    toggleNav(name: string) {
        var a = this.sidenav(name);
        a.toggle().then((inst) => console.debug("nav", inst))
    }

}

export const dbAdminState: iRegisterMeta<ng.ui.IState> = {

    name: "dbAdmin",
    config: {
        url: "/dbAdmin",
        template: "<ak-crud-struct config=\"config\">",
        controllerAs: "vm",
        controller: Ctrl,
        resolve: {
            config: (): CrudStructConfig => struct
        }
    }
};
