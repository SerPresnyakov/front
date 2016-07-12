import {CrudTableConfig} from "../../../../src/models/CrudTableConfig";
import {IntField} from "../../../../src/fieldTypes/IntField";
import {TableField} from "../../../../src/models/TableField";
import {StrField} from "../../../../src/fieldTypes/StrField";
import {BoolField} from "../../../../src/fieldTypes/BoolField";

export const table = new CrudTableConfig("Кампании", "/api/crud", "adwords_campaigns", "majorAdmin")
    .setFields([
        new TableField("id", 'ID', new IntField(), false, false, "input"),
        new TableField("name", 'Имя', new StrField(), false, false, "input"),
        new TableField("status", 'Статус', new StrField(), false, false, "input"),
        new TableField("track", "Отслеживать", new BoolField(), false, true, "switch"),
    ]);
    //.setTabs([{title:"Direct",url:"index.directCampaigs"},{title:"Adwords",url:"index.adwordsCampaigs",selected:true}]);
