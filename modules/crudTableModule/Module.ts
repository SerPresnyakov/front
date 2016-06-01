import {CrudTableDirective} from "./src/crudTable/CrudTableDirective"
import {Deps, Modules} from "../utils/Deps";
import {Run} from "./Run";
import {AngularModule} from "../../modules/utils/AngularModule";
import {filterButtonDirective} from "./src/filter/filterButton/Ctrl";
import {filterFieldsDirective} from "./src/filter/filterFields/Ctrl";

require("../../css/App.css");

let module = new AngularModule(Modules.crudTable, [
    Deps.localStorage,
    Deps.material,
    Deps.mdTable,
    Deps.angularFormly
]);

module.directive("akCrudTable", ["$compile", ($compile => CrudTableDirective($compile))]);
module.registerComponent([
    filterButtonDirective,
    filterFieldsDirective
]);

module.run(Run);

export default module.getModuleName()