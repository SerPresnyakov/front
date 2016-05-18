import {CrudStructDirective} from "./src/CrudStructCmpn"
import {Deps} from "../utils/Deps";
import {AngularModule} from "../../modules/utils/AngularModule";
import {CrudFieldDirective} from "./src/CrudFieldCmpn";

let module = new AngularModule("crudStruct", [
    Deps.localStorage,
    Deps.material,
    Deps.mdTable,
    Deps.angularFormly
]);

module.directive("akCrudStruct", ["$compile", ($compile => CrudStructDirective($compile))]);
module.directive("akCrudField", ["$compile", ($compile => CrudFieldDirective($compile))]);

export default module.getModuleName()