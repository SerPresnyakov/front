import {CrudTableConfig} from "../../../modules/crudTableModule/src/CrudTableConfig";
import {IntField} from "../../../modules/crudTableModule/src/fieldTypes/IntField";
import {StrField} from "../../../modules/crudTableModule/src/fieldTypes/StrField";
import {TableField} from "../../../modules/crudTableModule/src/TableField";

export const table: CrudTableConfig =
    new CrudTableConfig("GEO", "/pureRest/tsGeo",["PATCH"])
        .setFields([
            new TableField("brandId", "Бренд", new IntField(), false,false, "input"),
            new TableField("model", "Модель", new StrField(), false,false, "input")
        ]);