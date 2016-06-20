import {CrudTableConfig} from "../../../../src/models/CrudTableConfig";
import {ObjField} from "../../../../src/fieldTypes/ObjField";
import {IntField} from "../../../../src/fieldTypes/IntField";
import {StrField} from "../../../../src/fieldTypes/StrField";
import {TableField} from "../../../../src/models/TableField";
import {BoolField} from "../../../../src/fieldTypes/BoolField";
import {TableRel} from "../../../../src/models/TableRel";

export const table =
    new CrudTableConfig("Группы объявлений", "/api/crud", "direct.bannerGroups", "major2")
        .setFields([
            new TableField("campaign", 'Кампания', new ObjField(), false, false, "object"),
            new TableField("id", 'ID', new IntField(), false, false, "input", "campaign"),
            new TableField("name", 'Название', new StrField(), false, false,"input", "campaign"),
            new TableField("status", 'Статус', new StrField(), false, false,"input", "campaign"),
            new TableField("isActive", "Активна", new BoolField(), true, false, "switch", "campaign"),
            new TableField("statusShow", "Медиаплан", new BoolField(), true, false, "switch", "campaign"),
            new TableField("track", "Отслеживать", new BoolField(), true, false, "switch", "campaign"),
            new TableField("id", "ID", new IntField(), false,false, "input"),
            new TableField("name", "Название", new StrField(), false, false, "input"),
            new TableField("status", 'Статус', new StrField(), false, false, "select",null,[{prop:"ACCEPTED"},{prop:"REJECTED"}]),
            new TableField("brandId", "Бренд", new IntField(), true, true,"autocomplete"),
            new TableField("regionId", "Регион", new IntField(), true, true, "autocomplete"),
            new TableField("model", "Модель", new StrField(), true, true, "input"),
            new TableField("control", "Медиаплан", new BoolField(), true, true, "switch"),
            new TableField("getAds", "Тикеты", new BoolField(), true, true, "switch")
        ])
        .setRels([
            new TableRel("brandId", "public.brands", "/api/crud", "one", true),
            new TableRel("regionId", "public.regions", "/api/crud", "one", true),
            new TableRel("campaignId", "campaign", "/api/direct/campaign", "one", true)
        ])
        .setTabs([{title:"Direct",url:"index.directAdGroups",selected:true},{title:"Adwords",url:"index.adwordsAdGroups"}]);
