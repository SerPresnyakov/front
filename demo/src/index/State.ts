import {AuthService} from "../../../modules/authModule/AuthService";

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

export const indexState: iRegisterMeta<ng.ui.IState> = {

    name: "index",
    config: {
        url: "/",
        template: require<string>("./template.html"),
        controllerAs: "vm",
        controller: Ctrl,
        resolve: {
            user: [AuthService.serviceName, (auth: AuthService): ng.IPromise<any> => {
                return auth.me()
            }]
        }
    }

};