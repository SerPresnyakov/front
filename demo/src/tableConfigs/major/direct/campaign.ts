import {StrField} from "../../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../../../../modules/crudTableModule/src/fieldTypes/IntField";
import {ObjField} from "../../../../../modules/crudTableModule/src/fieldTypes/ObjField";
import {BoolField} from "../../../../../modules/crudTableModule/src/fieldTypes/BoolField";
import {TableField} from "../../../../../modules/crudTableModule/src/models/TableField";
import {CrudTableConfig} from "../../../../../modules/crudTableModule/src/models/CrudTableConfig";

export const table = new CrudTableConfig("Кампании", "/api/crud", "direct.campaigns")
    .setFields([
        new TableField("id", 'ID', new IntField(), false, false, "input"),
        new TableField("name", 'Имя', new StrField(), false, false, "input"),
        new TableField("status", 'Статус', new StrField(), false, false, "input"),
        new TableField("isActive", "Активна", new BoolField(), true, false, "switch"),
        new TableField("statusShow", "Медиаплан", new BoolField(), true, false, "switch"),
        new TableField("track", "Отслеживать", new BoolField(), true, true, "switch"),
    ])
    .setTabs([{title:"Direct",url:"index.directCampaigs",selected:true},{title:"Adwords",url:"index.adwordsCampaigs"}]);

