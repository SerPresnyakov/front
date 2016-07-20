import {CrudTableConfig} from "../../../src/models/CrudTableConfig";
import {StrField} from "../../../src/fieldTypes/StrField";
import {TableField} from "../../../src/models/TableField";

export const table = new CrudTableConfig("Регионы", "/api/crud", "public.regions", "majorAdmin")
    .setFields([
        new TableField("name", 'Название', new StrField(), false, false, true, "input"),
    ]);
