import {filterButtonDirective} from "./filter/filterButton/Ctrl";
import {filterFieldsDirective} from "./filter/filterFields/Ctrl";
import {CrudTableDirective} from "./crudTable/CrudTableDirective";
import {Run} from "./Run";
import {CrudTableConfig} from "./models/CrudTableConfig";
import {BoolField} from "./fieldTypes/BoolField";
import {IntField} from "./fieldTypes/IntField";
import {ObjField} from "./fieldTypes/ObjField";
import {StrField} from "./fieldTypes/StrField";
import {TableField} from "./models/TableField";
import {AddFunc} from "./crudTable/AddFunc";
const crudTableModule : ak.crudTableModule = {
    name: "crudTableModule",
    CrudTableConfig:(sourceName: string, url: string, tableName: string, connName: string): CrudTableConfig => {
        return new CrudTableConfig(sourceName, url, tableName, connName)
    },
    fieldTypes:{
        BoolField:new BoolField(),
        IntField:new IntField(),
        ObjField: new ObjField(),
        StrField: new StrField()
    },
    TableField:(
        name: string,
        title: string,
        fieldType: ak.crudTableModule.fieldTypes.FieldType,
        nullable: boolean,
        editable: boolean,
        formly: string,
        parent: string = null,
        options: any = null):TableField=>{
        return new TableField(name, title, fieldType, nullable, editable, formly, parent, options)
    },
    AddFunc:(
        type:string,
        ths:string,
        getTds:(obj)=>string):AddFunc=>{
        return new AddFunc(type, ths, getTds)
    }
};
window["ak"]["crudTableModule"] = crudTableModule;
let module = ak.utils.angularModule(ak.crudTableModule.name, [
    ak.utils.Deps.localStorage,
    ak.utils.Deps.material,
    ak.utils.Deps.mdTable,
    ak.utils.Deps.angularFormly
]);

module.directive("akCrudTable", ["$compile", ($compile => CrudTableDirective($compile))]);
module.registerComponent([{name:filterButtonDirective.name, config: filterButtonDirective.config},{ name:filterFieldsDirective.name, config: filterFieldsDirective.config}]);
module.registerFilter(ak.utils.Domain);

module.run(Run);