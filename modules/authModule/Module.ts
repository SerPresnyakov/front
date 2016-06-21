import {AuthService} from "./AuthService";
import {Run} from "./Run";
import {Config} from "./Config";
import {States} from "./States";

let module = ak.utils.angularModule(ak.authModule.name, [
    ak.utils.Deps.localStorage,
    ak.utils.Deps.uiRouter,
    ak.utils.Deps.formlyMaterial,
    ak.utils.Deps.ngMessages
]);

module.config(Config);
module.run(Run);

module.registerServices([{name: AuthService.serviceName, config: AuthService}]);

module.registerStates(States);

window["ak"].authModule = {
    name: "authModule",
    authService: {
        serviceName: AuthService.serviceName
    }
};

export default module.getModuleName();