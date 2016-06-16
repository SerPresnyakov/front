import {Run} from "./Run";
import {Config} from "./Config";
import {AuthService} from "./AuthService";
import {States} from "./States"

let uiHelper = require<ak.utils.uiHelper>("ak.utils/js/Angular");
let moduleNames = require<ak.utils.Deps>("ak.utils/js/Deps");

let module = angular.module("ak.auth", [
    moduleNames.localStorage,
    moduleNames.uiRouter,
    moduleNames.formlyMaterial
]);

module.config(Config);
module.run(Run);
module.service(AuthService.serviceName, AuthService);

uiHelper.registerStates(module, States);

export default module.name;