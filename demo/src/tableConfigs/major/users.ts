import {CrudTableConfig} from "../../../../modules/crudTableModule/src/CrudTableConfig";
import {StrField} from "../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../../../modules/crudTableModule/src/fieldTypes/IntField";
import {TableRel} from "../../../../modules/crudTableModule/src/TableRel";
import {ObjField} from "../../../../modules/crudTableModule/src/fieldTypes/ObjField";
import {TableField} from "../../../../modules/crudTableModule/src/TableField";

export const table: CrudTableConfig = new CrudTableConfig("Бренды", "/api/user")
    .setFields([
        new TableField("name", 'Имя', new StrField(), false,"input"),
        new TableField("role", 'Роль', new ObjField(), false,"object"),
        new TableField("name", 'Роль', new StrField(), false,"select", "role",[{prop:"brand"},{prop:"admin"}]),
        new TableField("email", 'Email', new StrField(), false,"input"),
    ]);
