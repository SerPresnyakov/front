import {StrField} from "../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../../../modules/crudTableModule/src/fieldTypes/IntField";
import {ObjField} from "../../../../modules/crudTableModule/src/fieldTypes/ObjField";
import {CrudTableConfig} from "../../../../modules/crudTableModule/src/models/CrudTableConfig";
import {TableField} from "../../../../modules/crudTableModule/src/models/TableField";

export const table = new CrudTableConfig("Пользователи", "/api/crud", "users")
    .setFields([
        new TableField("name", 'Имя', new StrField(), false,false,"input"),
        new TableField("role", 'Роль', new ObjField(), false,false,"object"),
        new TableField("name", 'Роль', new StrField(), false,false,"select", "role",[{prop:"brand"},{prop:"admin"}]),
        new TableField("email", 'Email', new StrField(), false,false,"input")
    ]);
