import {AngularModule} from "../utils/AngularModule";
import {states} from "./src/states/States";
import {Config} from "./Config"
import {SidenavDirective} from "./src/directives/sidenav/SidenavDirective";

let module = new AngularModule(ak.apiAdminModule.name, [
    ak.utils.Deps.Deps.uiRouter,
    ak.utils.Deps.material,
    ak.utils.Deps.mdTable,
    ak.jsonDaoModule.name,
    ak.crudTableModule.name,
    ak.authModule.name

]);

window["ak"].apiAdminModule = {
    name:"apiAdmin"
};

module.registerStates(states);

module.module.directive("akSidenav", SidenavDirective.factory());

module.config(Config);