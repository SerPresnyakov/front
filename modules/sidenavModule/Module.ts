import {AngularModule} from "../utils/AngularModule";
import {Deps} from "../utils/Deps";
import {SidenavDirective} from "./SidenavDirective";

let module = new AngularModule("sidenav" , [
    Deps.material,
    Deps.mdTable
]);

module.directive("akSidenav", ["$compile", "$q", (($compile, $q) => SidenavDirective($compile, $q))]);


export default module.getModuleName()