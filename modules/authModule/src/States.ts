import {LoginCtrl} from "./login/Ctrl";
import config = ak.utils.config;

export const States: config<ng.ui.IState>[] = [{
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