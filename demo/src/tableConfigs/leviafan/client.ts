import {CrudTableConfig} from "../../../../modules/crudTableModule/src/CrudTableConfig";
import {StrField} from "../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {TableField} from "../../../../modules/crudTableModule/src/TableField";

export const table: CrudTableConfig = new CrudTableConfig("Клиенты", "/left/client",["PATCH"])
    .setFields([
        new TableField("name", 'Имя', new StrField(), false,false, "input"),
        new TableField("login", 'Логин', new StrField(), false,false, "input")
    ]);