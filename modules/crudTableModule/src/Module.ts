import {CrudTableDirective} from "./crudTable/CrudTableDirective"
import {Run} from "./Run";
import {filterButtonDirective} from "./filter/filterButton/Ctrl";
import {filterFieldsDirective} from "./filter/filterFields/Ctrl";

var Modules: ak.utils.iModules = require("ak.utils/js/Modules");
var Deps: ak.utils.iDeps = require("ak.utils/js/Deps");

let module = angular.module(Modules.crudTable, [
    Deps.localStorage,
    Deps.material,
    Deps.mdTable,
    Deps.angularFormly
]);

module.directive("akCrudTable", ["$compile", ($compile => CrudTableDirective($compile))]);
module.component(filterButtonDirective.name, filterButtonDirective);
module.component(filterFieldsDirective.name, filterFieldsDirective);

module.run(Run);

export default module.name