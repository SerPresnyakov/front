import {CrudTableConfig} from "../../../src/models/CrudTableConfig";
import {StrField} from "../../../src/fieldTypes/StrField";
import {TableField} from "../../../src/models/TableField";

export const table = new CrudTableConfig("Бренды", "/api/crud", "public.brands")
    .setFields([
        new TableField("name", 'Название', new StrField(),false, false,"input"),
    ]);
