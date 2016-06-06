import {AngularModule} from "../utils/AngularModule";
import {Deps, Modules} from "../utils/Deps";
import {states} from "./src/states/States";
import {Config} from "./Config"
import {SidenavDirective} from "./src/directives/sidenav/SidenavDirective";

let module = new AngularModule(Modules.apiAdmin, [
    Deps.uiRouter,
    Deps.material,
    Deps.mdTable,
    Modules.jsonDAO,
    Modules.crudTable,
    Modules.auth
]);

module.registerStates(states);

module.module.directive("akSidenav", SidenavDirective.factory());

module.config(Config);