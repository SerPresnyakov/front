import {CrudTableConfig} from "../../../../src/models/CrudTableConfig";
import {TableField} from "../../../../src/models/TableField";
import {IntField} from "../../../../src/fieldTypes/IntField";
import {StrField} from "../../../../src/fieldTypes/StrField";
import {AdField} from "../../../../src/fieldTypes/AdField";

export const table =
    new CrudTableConfig("Обьявления", "/api/crud", "adwords.adGroupAds", ak.utils.ApiUrls.connName)
        .setFields([
            new TableField("id", 'ID', new IntField(), false, false, "input"),
            new TableField("adGroupId", 'adGroupId', new IntField(), false, false, "input"),
            new TableField("status", 'Статус', new StrField(), false, false, "select",null,[{prop:"ENABLED"},{prop:"PAUSED"}]),
            new TableField("textAd", 'Обьявление', new AdField({title:{title:"string"}, url:{finalUrls:"array"}, desc:{text1:"string", text2:"string"}}), false, false, "input"),
            new TableField("comment", "Комментарий", new StrField(), false, false, "input")
        ])
        .setTabs([{title:"Direct",url:"directAds"},{title:"Adwords",url:"adwordsAds",selected:true}]);