import {CrudTableConfig} from "../../../src/models/CrudTableConfig";
import {StrField} from "../../../src/fieldTypes/StrField";
import {TableField} from "../../../src/models/TableField";

export const table = new CrudTableConfig("Клиенты", "/api/crud", "client")
    .setFields([
        new TableField("name", 'Имя', new StrField(), false,false, "input"),
        new TableField("login", 'Логин', new StrField(), false,false, "input")
    ]);