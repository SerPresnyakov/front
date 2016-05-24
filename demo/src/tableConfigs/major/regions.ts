import {StrField} from "../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../../../modules/crudTableModule/src/fieldTypes/IntField";
import {ObjField} from "../../../../modules/crudTableModule/src/fieldTypes/ObjField";
import {TableField} from "../../../../modules/crudTableModule/src/models/TableField";
import {CrudTableConfig} from "../../../../modules/crudTableModule/src/models/CrudTableConfig";

export const table = new CrudTableConfig("Регионы", "/api/crud", "public.regions")
    .setFields([
        new TableField("name", 'Название', new StrField(), false, false,"input"),
    ]);
//bla
