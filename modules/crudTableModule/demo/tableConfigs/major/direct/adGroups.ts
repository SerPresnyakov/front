import {CrudTableConfig} from "../../../../src/models/CrudTableConfig";
import {ObjField} from "../../../../src/fieldTypes/ObjField";
import {IntField} from "../../../../src/fieldTypes/IntField";
import {StrField} from "../../../../src/fieldTypes/StrField";
import {TableField} from "../../../../src/models/TableField";
import {BoolField} from "../../../../src/fieldTypes/BoolField";
import {TableRel} from "../../../../src/models/TableRel";

export const table =
    new CrudTableConfig("Группы объявлений", "/api/crud", "direct.bannerGroups", "majorAdmin", {patch:true, delete:true, create:true})
        .setFields([
            new TableField("campaign", 'Кампания', new ObjField(), false, false, true, "object", [
                new TableField("id", 'ID', new IntField(), false, false, true, "input"),
                new TableField("name", 'Название', new StrField(), false, false, true, "input"),
                new TableField("status", 'Статус', new StrField(), false, false, true, "input"),
                new TableField("isActive", "Активна", new BoolField(), true, false, true, "switch"),
                new TableField("statusShow", "Медиаплан", new BoolField(), true, false, true, "switch"),
                new TableField("track", "Отслеживать", new BoolField(), true, false, true, "switch"),
            ]),
            new TableField("id", "ID", new IntField(), false, false, true,"input"),
            new TableField("name", "Название", new StrField(), false, false, true, "input"),
            new TableField("status", 'Статус', new StrField(), false, false, true, "select",null,[{prop:"ACCEPTED"},{prop:"REJECTED"}]),
            new TableField("brandId", "Бренд", new IntField(), true, true, true, "autocomplete"),
            new TableField("regionId", "Регион", new IntField(), true, true, true, "autocomplete"),
            new TableField("model", "Модель", new StrField(), true, true, true, "input"),
            new TableField("control", "Медиаплан", new BoolField(), true, true, true, "switch"),
            new TableField("getAds", "Тикеты", new BoolField(), true, true, true, "switch")
        ])
        .setRels([
            new TableRel("brandId", "brand", null , "one"),
            new TableRel("regionId", "region",null , "one"),
            new TableRel("campaignId", "campaign", null, "one")
        ]);
        //.setTabs([{title:"Direct",url:"index.directAdGroups",selected:true},{title:"Adwords",url:"index.adwordsAdGroups"}]);
