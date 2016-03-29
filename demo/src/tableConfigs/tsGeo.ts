//noinspection TypeScriptValidateTypes
import {CrudTableConfig} from "../crudTable/src/CrudTableConfig";
import {IntField} from "../crudTable/src/fieldTypes/IntField";
import {StrField} from "../crudTable/src/fieldTypes/StrField";
import {TableField} from "../crudTable/src/TableField";

export const table: CrudTableConfig =
    new CrudTableConfig("GEO", "/pureRest/tsGeo")
        .setFields([
            {
                name: "brandId",
                title: "Бренд",
                fieldType: new IntField(),
                nullable: false,
                formly: "input"
            },
            {
                name: "model",
                title: "Модель",
                fieldType: new StrField(),
                nullable: false,
                formly: "input"
            }
        ]);