class Ctrl {

    static $inject = ["$mdSidenav"];

    constructor(
        private sidenav: ng.material.ISidenavService
    ) {}

    toggleNav(name: string) {
        var a = this.sidenav(name);
        a.toggle().then((inst) => console.debug("nav", inst))
    }

}

export const indexState: iRegister<ng.ui.IState> = {

    name: "index",
    config: {
        url: "/",
        template: require<string>("./template.html"),
        controllerAs: "vm",
        controller: Ctrl
    }

};