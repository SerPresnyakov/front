
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
        template: "<ak-crud-table config=\"config\" type='sidenav'>",
        controllerAs: "vm",
        controller: Ctrl,
        resolve: {
            config: (): CrudTableConfig => struct
        }
    }
};
