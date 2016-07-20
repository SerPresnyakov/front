import {CrudTableConfig} from "../../../src/models/CrudTableConfig";
import {StrField} from "../../../src/fieldTypes/StrField";
import {TableField} from "../../../src/models/TableField";
import {ObjField} from "../../../src/fieldTypes/ObjField";

export const table = new CrudTableConfig("Пользователи", "/api/crud", "users", "majorAdmin")
    .setFields([
        new TableField("name", 'Имя', new StrField(), false,false,true,"input"),
        new TableField("role", 'Роль', new ObjField(), false,false,true,"object",[
            new TableField("name", 'Роль', new StrField(), false,false,true,"select", null, [{prop:"brand"},{prop:"admin"}])
        ]),
        new TableField("email", 'Email', new StrField(), false,false,true,"input")
    ]);
