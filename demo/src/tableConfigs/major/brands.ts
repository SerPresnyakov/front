import {StrField} from "../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../../../modules/crudTableModule/src/fieldTypes/IntField";
import {ObjField} from "../../../../modules/crudTableModule/src/fieldTypes/ObjField";
import {CrudTableConfig} from "../../../../modules/crudTableModule/src/models/CrudTableConfig";
import {TableField} from "../../../../modules/crudTableModule/src/models/TableField";

export const table = new CrudTableConfig("Бренды", "/api/crud", "brands")
    .setFields([
        new TableField("name", 'Название', new StrField(),false, false,"input"),
    ]);
