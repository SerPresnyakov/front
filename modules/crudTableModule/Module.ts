import {CrudTableDirective} from "./src/CrudTableCmpn"
import {Deps} from "../utils/Deps";

const module = angular.module("restCrud", [
    Deps.localStorage,
    Deps.material,
    Deps.mdTable,
    Deps.angularFormly
]);

module.directive("akCrudTable", ["$compile", ($compile => CrudTableDirective($compile))]);

export default module.name