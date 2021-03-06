import {IntField} from "../../../../../modules/crudTableModule/src/fieldTypes/IntField";
import {StrField} from "../../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {BoolField} from "../../../../../modules/crudTableModule/src/fieldTypes/BoolField";
import {CrudTableConfig} from "../../../../../modules/crudTableModule/src/CrudTableConfig";
import {TableRel} from "../../../../../modules/crudTableModule/src/TableRel";
import {TableField} from "../../../../../modules/crudTableModule/src/TableField";
import {ObjField} from "../../../../../modules/crudTableModule/src/fieldTypes/ObjField";

export const table: CrudTableConfig =
    new CrudTableConfig("Группы объявлений", "/api/direct/bannerGroup",{patch:false})
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
            new TableRel("brandId", "brand", "/api/refs/brand", "one", true),
            new TableRel("regionId", "region", "/api/refs/region", "one", true),
            new TableRel("campaignId", "campaign", "/api/direct/campaign", "one", true)
        ])
        .setTabs([{title:"Direct",url:"index.directAdGroups",selected:true},{title:"Adwords",url:"index.adwordsAdGroups"}]);
