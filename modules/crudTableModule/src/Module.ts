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
import {AddFunc} from "./crudTable/AddFunc/AddFunc";
import {TimestampField} from "./fieldTypes/TimestampField";
import {DefaultField} from "./fieldTypes/DefaultField";
import iTableRelType = ak.crudTableModule.filters.iTableRelType;
import {TableRel} from "./models/TableRel";
import FieldType = ak.crudTableModule.fieldTypes.FieldType;
import {FilterTemplateProvider} from "./FilterTemplateConfig";
import {ButtonType} from "./crudTable/AddFunc/ButtonType";
import {CellType} from "./crudTable/AddFunc/CellType";
import iTableRelDao = ak.crudTableModule.iTableRelDao;

const crudTableModule : ak.crudTableModule = {
    name: "crudTableModule",
    CrudTableConfig:(sourceName: string, url: string, tableName: string, connName: string, allowedMethods: ak.crudTableModule.AllowedMethods): CrudTableConfig => {
        return new CrudTableConfig(sourceName, url, tableName, connName, allowedMethods)
    },
    fieldTypes:{
        BoolField:new BoolField(),
        IntField:new IntField(),
        ObjField: new ObjField(),
        StrField: new StrField(),
        DefaultField: new DefaultField(),
        TimestampField: new TimestampField()
    },
    TableField:(
        name: string,
        title: string,
        fieldType: ak.crudTableModule.fieldTypes.FieldType,
        nullable: boolean,
        editable: boolean,
        showInTemplate: boolean,
        formly: string,
        childs: ak.crudTableModule.TableField<FieldType>[] = null,
        options: any = null):TableField=>{
        return new TableField(name, title, fieldType, nullable, editable,showInTemplate, formly, childs, options)
    },
    TableRel:(
        name: string,
        field: string,
        include : TableRel[],
        type: iTableRelType,
        dao: iTableRelDao,
        displayField: string = "name"):TableRel=>{
        return new TableRel(name, field, include, type, dao, displayField)
    },
    AddFunc:(
        type:ak.crudTableModule.AddFuncType,
        ths:string,
        getTds:(obj)=>string):AddFunc=>{
        return new AddFunc(type, ths, getTds)
    },
    AddFuncTypes:{
        ButtonType: new ButtonType(),
        CellType: new CellType()
    }
};

window["ak"]["crudTableModule"] = crudTableModule;
let module = ak.utils.angularModule(ak.crudTableModule.name, [
    ak.utils.Deps.localStorage,
    ak.utils.Deps.material,
    ak.utils.Deps.mdTable,
    ak.utils.Deps.angularFormly,
    ak.utils.Deps.formlyBootstrap,
    ak.utils.Deps.uiBootstrap,
    ak.utils.Deps.ngMessages,
    ak.utils.Deps.confirm
]);

module.directive("akCrudTable", ["$compile", ($compile => CrudTableDirective($compile))]);
module.registerComponent([{name:filterButtonDirective.name, config: filterButtonDirective.config},{ name:filterFieldsDirective.name, config: filterFieldsDirective.config}]);
module.registerFilter(ak.utils.Domain);
module.module.provider("FilterModuleTemplate", FilterTemplateProvider);
module.run(Run);