import {IntField} from "../crud/table/fieldTypes/IntField";
import {StrField} from "../crud/table/fieldTypes/StrField";
import {BoolField} from "../crud/table/fieldTypes/BoolField";
import {CrudTableConfig} from "../crud/table/CrudTableConfig";
import {TableRel} from "../crud/table/TableRel";

export const table: CrudTableConfig =
    new CrudTableConfig("Группы объявлений", "/api/direct/bannerGroup?token=1:god&include=region,brand")
        .setFields([{
            name: "id",
            title: "ID",
            fieldType: new IntField(),
            nullable: false
        },{
            name: "name",
            title: "Название",
            fieldType: new StrField(),
            nullable: false
        }, {
            name: "brandId",
            title: "Бренд",
            fieldType: new IntField(),
            nullable: true
        }, {
            name: "regionId",
            title: "Регион",
            fieldType: new IntField(),
            nullable: true
        }, {
            name: "model",
            title: "Модель",
            fieldType: new StrField(),
            nullable: true
        }, {
            name: "control",
            title: "Медиаплан",
            fieldType: new BoolField(),
            nullable: true
        }, {
            name: "getAds",
            title: "Тикеты",
            fieldType: new BoolField(),
            nullable: true
        }])
        .setRels([
            new TableRel("brandId", "brand", "/api/refs/brand", "one"),
            new TableRel("regionId", "region", "/api/refs/region", "one")
        ]);
