import {StrField} from "../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {TableField} from "../../../../modules/crudTableModule/src/models/TableField";
import {CrudTableConfig} from "../../../../modules/crudTableModule/src/crudTable/CrudTableConfig";

export const table = new CrudTableConfig("Клиенты", "/api/crud", "client")
    .setFields([
        new TableField("name", 'Имя', new StrField(), false,false, "input"),
        new TableField("login", 'Логин', new StrField(), false,false, "input")
    ]);