import {Run} from "./Run";
import {Config} from "./Config";
import {AuthService} from "./AuthService";
import {States} from "./States"
import authService = ak.authService;


let module = ak.utils.angularModule(ak.authModule.name, [
    ak.utils.Deps.localStorage,
    ak.utils.Deps.uiRouter,
    ak.utils.Deps.formlyMaterial,
    ak.utils.Deps.ngMessages
]);
module.config(Config);
module.run(Run);

module.registerServices([{name: ak.authModule.authService.serviceName, config: authService}]);

module.registerStates(States);
const authModule =  {
    name: "authModule",
    authService: AuthService
};

window["ak"]["authModule"] = authModule;
