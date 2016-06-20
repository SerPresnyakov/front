import {AngularModule} from "../utils/AngularModule"
import {Deps} from "../utils/Deps";
import {AuthService} from "./AuthService";
import {Run} from "./Run";
import {Config} from "./Config";
import {States} from "./States";

let module = new AngularModule("a.auth", [
    Deps.localStorage,
    Deps.uiRouter,
    Deps.formlyMaterial,
    Deps.ngMessages
]);

module.config(Config);
module.run(Run);

module.registerServices([{name: AuthService.serviceName, config: AuthService}]);

module.registerStates(States);

window["akAuth"] = {
    authService: {
        serviceName: AuthService.serviceName
    }
};

export default module.getModuleName();