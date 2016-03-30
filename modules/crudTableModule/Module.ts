import {CrudTableDirective} from "./src/CrudTableCmpn"
import {Deps} from "../utils/Deps";
import {Run} from "./Run";
import {filterButtonDirective} from "./src/filterButton/Ctrl";

const module = angular.module("restCrud", [
    Deps.localStorage,
    Deps.material,
    Deps.mdTable,
    Deps.angularFormly
]);

module.directive("akCrudTable", ["$compile", ($compile => CrudTableDirective($compile))]);
module.directive(filterButtonDirective);

module.run(Run);

export default module.name