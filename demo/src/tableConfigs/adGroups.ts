import {IntField} from "../../../modules/crudTableModule/src/fieldTypes/IntField";
import {StrField} from "../../../modules/crudTableModule/src/fieldTypes/StrField";
import {BoolField} from "../../../modules/crudTableModule/src/fieldTypes/BoolField";
import {CrudTableConfig} from "../../../modules/crudTableModule/src/CrudTableConfig";
import {TableRel} from "../../../modules/crudTableModule/src/TableRel";
import {TableField} from "../../../modules/crudTableModule/src/TableField";

export const table: CrudTableConfig =
    new CrudTableConfig("Группы объявлений", "/api/direct/bannerGroup")
        .setFields([
            new TableField("id", "ID", new IntField(), false, "input"),
            new TableField("name", "Название", new StrField(), false, "input"),
            new TableField("status", 'Статус', new StrField(), false, "select",null,[{prop:"ACCEPTED"},{prop:"REJECTED"}]),
            new TableField("brandId", "Бренд", new IntField(), true, "autocomplete"),
            new TableField("regionId", "Регион", new IntField(), true, "autocomplete"),
            new TableField("model", "Модель", new StrField(), true, "input"),
            new TableField("control", "Медиаплан", new BoolField(), true, "switch"),
            new TableField("getAds", "Тикеты", new BoolField(), true, "switch")
        ])
        .setRels([
            new TableRel("brandId", "brand", "/api/refs/brand", "one", true),
            new TableRel("regionId", "region", "/api/refs/region", "one", true)
        ]);
