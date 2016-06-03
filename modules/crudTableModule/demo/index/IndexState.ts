import {ConfigsService} from "../ConfigsService";
import {StatesRegister} from "../StatesRegister";

class Ctrl {

    static $inject = ["$mdSidenav", ConfigsService.angularName];

    constructor(
        private sidenav: ng.material.ISidenavService,
        private configs: crudTable.demo.iConfigsService
    ) {
        console.log("sidenav ctrl", configs)
    }

    toggleNav(name: string) {
        var a = this.sidenav(name);
        a.toggle().then((inst) => console.debug("nav", inst))
    }

    getStateName(tableName: string): string {
        return StatesRegister.getStateName(tableName)
    }

}

export const indexState: iRegisterMeta<ng.ui.IState> = {

    name: "index",
    config: {
        url: "/",
        template: require<string>("./template.html"),
        controllerAs: "vm",
        controller: Ctrl
    }

};