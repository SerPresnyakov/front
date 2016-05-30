import {AngularModule} from "../utils/AngularModule";
import {Deps} from "../utils/Deps";
import {states} from "./States";
import {Config} from "./Config"
import {SidenavDirective} from "./sidenavDirective/SidenavDirective";
import {Run} from "./Run";

let module = new AngularModule('apiAdmin',[
    Deps.uiRouter,
    Deps.material,
    Deps.mdTable,
    Deps.crudTableModule,
    Deps.authModule
]);

module.registerStates(states);

module.directive("akSidenav",["$compile", (($compile)=> SidenavDirective($compile))]);

module.config(Config);

module.run(Run);