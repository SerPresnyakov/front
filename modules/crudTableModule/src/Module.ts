import {CrudTableDirective} from "./crudTable/CrudTableDirective"
import {Run} from "./Run";
import {filterButtonDirective} from "./filter/filterButton/Ctrl";
import {filterFieldsDirective} from "./filter/filterFields/Ctrl";


let module = angular.module(ak.crudTableModule.name, [
    ak.utils.Deps.localStorage,
    ak.utils.Deps.material,
    ak.utils.Deps.mdTable,
    ak.utils.Deps.angularFormly
]);

module.directive("akCrudTable", ["$compile", ($compile => CrudTableDirective($compile))]);
module.component(filterButtonDirective.name, filterButtonDirective);
module.component(filterFieldsDirective.name, filterFieldsDirective);

module.run(Run);

window["ak"].crudTableModule = {
    name: "crudTableModule",
};

export default module.name