import {CrudStructDirective} from "./src/CrudStructCmpn"
import {Deps} from "../utils/Deps";
import {AngularModule} from "../../modules/utils/AngularModule";

let module = new AngularModule("crudStruct", [
    Deps.localStorage,
    Deps.material,
    Deps.mdTable,
    Deps.angularFormly
]);

module.directive("akCrudStruct", ["$compile", ($compile => CrudStructDirective($compile))]);

export default module.getModuleName()