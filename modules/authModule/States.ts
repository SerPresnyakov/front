import {LoginCtrl} from "./login/Ctrl";

export const States: iRegisterMeta<ng.ui.IState>[] = [{
    name: "login",
    config: {
        url: "/login?from",
        template: require<string>("./login/Template.html"),
        controller: LoginCtrl,
        controllerAs:"vm"
    }
}, {
    name: "badGateway",
    config: {
        url: "/internalError?from",
        template: require<string>("./templates/BadGateway.html")
    }
}];