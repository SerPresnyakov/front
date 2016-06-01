import {StrField} from "../../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../../../../modules/crudTableModule/src/fieldTypes/IntField";
import {ObjField} from "../../../../../modules/crudTableModule/src/fieldTypes/ObjField";
import {BoolField} from "../../../../../modules/crudTableModule/src/fieldTypes/BoolField";
import {TableField} from "../../../../../modules/crudTableModule/src/models/TableField";
import {CrudTableConfig} from "../../../../../modules/crudTableModule/src/crudTable/CrudTableConfig";

export const table = new CrudTableConfig("Кампании", "/api/crud", "adwords.campaigns")
    .setFields([
        new TableField("id", 'ID', new IntField(), false, false, "input"),
        new TableField("name", 'Имя', new StrField(), false, false, "input"),
        new TableField("status", 'Статус', new StrField(), false, false, "input"),
        new TableField("track", "Отслеживать", new BoolField(), false, true, "switch"),
    ])
    .setTabs([{title:"Direct",url:"index.directCampaigs"},{title:"Adwords",url:"index.adwordsCampaigs",selected:true}]);
