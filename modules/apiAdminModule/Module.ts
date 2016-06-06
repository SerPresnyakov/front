import {AngularModule} from "../utils/AngularModule";
import {Deps, Modules} from "../utils/Deps";
import {states} from "./src/states/States";
import {Config} from "./Config"
import {SidenavDirective} from "./src/directives/sidenav/SidenavDirective";
import {ConfigBuilderService} from "./src/ConfigBuilder/ConfigBuilderService";


let module = new AngularModule(Modules.apiAdmin, [
    Deps.uiRouter,
    Deps.material,
    Deps.mdTable,
    Modules.crudTable,
    Modules.auth
]);

module.registerStates(states);

module.directive("akSidenav",["$compile", (($compile)=> SidenavDirective($compile))]);

module.registerServices([{name:ConfigBuilderService.serviceName ,config: ConfigBuilderService}]);

module.config(Config);