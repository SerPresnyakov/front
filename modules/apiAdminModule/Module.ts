import {states} from "./src/states/States";
import {Config} from "./Config"
import {SidenavDirective} from "./src/directives/sidenav/SidenavDirective";
import {Run} from "../apiAdminModule/Run";

const apiAdminModule = {
    name:"apiAdmin"
};

window["ak"]["apiAdminModule"] = apiAdminModule;

let module = ak.utils.angularModule(ak.apiAdminModule.name, [
    ak.utils.Deps.mdTable,
    ak.jsonDaoModule.name,
    ak.crudTableModule.name,
    ak.authModule.name,
    ak.utils.Deps.confirm
]);

module.registerStates(states);

module.config(Config);
//module.run(Run);

module.module.directive("akSidenav", SidenavDirective.factory());

