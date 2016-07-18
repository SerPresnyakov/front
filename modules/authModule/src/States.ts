import {LoginCtrl} from "./login/Ctrl";
import config = ak.config;

export const states: config<ng.ui.IState>[] = [{
        name: "login",
        config: {
            url: "/login?from",
            templateProvider:(AuthModuleTemplate)=> {
                return AuthModuleTemplate.getTemplate();
            },
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