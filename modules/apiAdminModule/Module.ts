import {states} from "./src/states/States";
import {Config} from "./Config"
import {SidenavDirective} from "./src/directives/sidenav/SidenavDirective";

const apiAdminModule = {
    name:"apiAdmin"
};

window["ak"]["apiAdminModule"] = apiAdminModule;

let module = ak.utils.angularModule(ak.apiAdminModule.name, [
    ak.utils.Deps.uiRouter,
    ak.utils.Deps.material,
    ak.utils.Deps.mdTable,
    ak.jsonDaoModule.name,
    ak.crudTableModule.name,
    ak.authModule.name

]);

module.registerStates(states);

module.module.directive("akSidenav", SidenavDirective.factory());

module.config(Config);