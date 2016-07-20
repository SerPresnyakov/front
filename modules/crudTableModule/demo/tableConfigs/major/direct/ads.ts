import {CrudTableConfig} from "../../../../src/models/CrudTableConfig";
import {TableField} from "../../../../src/models/TableField";
import {IntField} from "../../../../src/fieldTypes/IntField";
import {StrField} from "../../../../src/fieldTypes/StrField";
import {DefaultField} from "../../../../src/fieldTypes/DefaultField";

export const table =
    new CrudTableConfig("Обьявления", "/api/crud", "direct.banners", "majorAdmin")
        .setFields([
            new TableField("id", 'ID', new IntField(), false, false,true, "input"),
            new TableField("bannerGroupId", 'bannerGroupId', new IntField(), false, false,true, "input"),
            new TableField("status", 'Статус', new StrField(), false, false,true, "select",null,[{prop:"ACCEPTED"},{prop:"REJECTED"}]),
            new TableField("state", 'state', new StrField(), false, false, true,"select",null,[{prop:"ON"},{prop:"SUSPENDED"}]),
            new TableField("visitCardId", 'visitCardId', new IntField(), false, false, true,"input"),
            new TableField("siteLinksId", 'siteLinksId', new IntField(), false, false, true,"input"),
            new TableField("comment", "Комментарий", new StrField(), false, false, true,"input"),
            new TableField("banner", "Обьявление", new DefaultField(), false, false, true,"input" )

        ])
        .setTabs([{title:"Direct",url:"directAds",selected:true},{title:"Adwords",url:"adwordsAds"}]);