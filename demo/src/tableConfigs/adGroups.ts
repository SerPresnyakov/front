import {IntField} from "../crudTable/src/fieldTypes/IntField";
import {StrField} from "../crudTable/src/fieldTypes/StrField";
import {BoolField} from "../crudTable/src/fieldTypes/BoolField";
import {CrudTableConfig} from "../crudTable/src/CrudTableConfig";
import {TableRel} from "../crudTable/src/TableRel";

export const table: CrudTableConfig =
    new CrudTableConfig("Группы объявлений", "/api/direct/bannerGroup")
        .setFields([{
            name: "id",
            title: "ID",
            fieldType: new IntField(),
            nullable: false,
            formly:"input"
        },{
            name: "name",
            title: "Название",
            fieldType: new StrField(),
            nullable: false,
            formly:"input"
        }, {
            name: "brandId",
            title: "Бренд",
            fieldType: new IntField(),
            nullable: true,
            formly:"autocomplete"
        }, {
            name: "regionId",
            title: "Регион",
            fieldType: new IntField(),
            nullable: true,
            formly:"autocomplete"
        }, {
            name: "model",
            title: "Модель",
            fieldType: new StrField(),
            nullable: true,
            formly:"input"
        }, {
            name: "control",
            title: "Медиаплан",
            fieldType: new BoolField(),
            nullable: true,
            formly:"switch"
        }, {
            name: "getAds",
            title: "Тикеты",
            fieldType: new BoolField(),
            nullable: true,
            formly:"switch"
        }])
        .setRels([
            new TableRel("brandId", "brand", "/api/refs/brand", "one"),
            new TableRel("regionId", "region", "/api/refs/region", "one")
        ]);
