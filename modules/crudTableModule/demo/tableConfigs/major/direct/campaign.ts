import {CrudTableConfig} from "../../../../src/models/CrudTableConfig";
import {IntField} from "../../../../src/fieldTypes/IntField";
import {TableField} from "../../../../src/models/TableField";
import {StrField} from "../../../../src/fieldTypes/StrField";
import {BoolField} from "../../../../src/fieldTypes/BoolField";

export const table = new CrudTableConfig("Кампании", "/api/crud", "direct.campaigns", "major2")
    .setFields([
        new TableField("id", 'ID', new IntField(), false, false, "input"),
        new TableField("name", 'Имя', new StrField(), false, false, "input"),
        new TableField("status", 'Статус', new StrField(), false, false, "input"),
        new TableField("isActive", "Активна", new BoolField(), true, false, "switch"),
        new TableField("statusShow", "Медиаплан", new BoolField(), true, false, "switch"),
        new TableField("track", "Отслеживать", new BoolField(), true, true, "switch"),
    ])
    //.setTabs([{title:"Direct",url:"index.directCampaigs",selected:true},{title:"Adwords",url:"index.adwordsCampaigs"}]);

