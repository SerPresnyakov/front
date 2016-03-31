import {CrudTableDirective} from "./src/CrudTableCmpn"
import {Deps} from "../utils/Deps";
import {Run} from "./Run";
import {AngularModule} from "../../modules/utils/AngularModule";
import {filterButtonDirective} from "./src/filter/filterButton/Ctrl";
import {filterFieldsDirective} from "./src/filter/filterFields/Ctrl";

let module = new AngularModule("restCrud", [
    Deps.localStorage,
    Deps.material,
    Deps.mdTable,
    Deps.angularFormly
]);

module.directive("akCrudTable", ["$compile", ($compile => CrudTableDirective($compile))]);
module.registerComponent([filterButtonDirective,filterFieldsDirective]);

module.run(Run);

export default module.getModuleName()