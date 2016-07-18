import {Run} from "./Run";
import {Config} from "./Config";
import {AuthService} from "./AuthService";
import {states} from "./States";
import {AuthModuleTemplateProvider} from "./AuthModuleTemplateConfig";

const authModule:ak.authModule =  {
    name: "authModule",
    authServiceName: AuthService.serviceName
};

window["ak"]["authModule"] = authModule;

let module = ak.utils.angularModule(ak.authModule.name, [
    ak.utils.Deps.localStorage,
    ak.utils.Deps.uiRouter,
    ak.utils.Deps.formlyMaterial,
    ak.utils.Deps.ngMessages
]);
module.config(Config);
module.run(Run);
module.module.provider("AuthModuleTemplate", AuthModuleTemplateProvider);

module.registerServices([{name: AuthService.serviceName, config: AuthService}]);

module.registerStates(states);
