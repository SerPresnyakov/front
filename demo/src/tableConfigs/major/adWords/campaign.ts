import {CrudTableConfig} from "../../../../../modules/crudTableModule/src/CrudTableConfig";
import {StrField} from "../../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../../../../modules/crudTableModule/src/fieldTypes/IntField";
import {TableRel} from "../../../../../modules/crudTableModule/src/TableRel";
import {ObjField} from "../../../../../modules/crudTableModule/src/fieldTypes/ObjField";
import {TableField} from "../../../../../modules/crudTableModule/src/TableField";
import {BoolField} from "../../../../../modules/crudTableModule/src/fieldTypes/BoolField";

export const table: CrudTableConfig = new CrudTableConfig("Кампании", "/api/adwords/campaign",{})
    .setFields([
        new TableField("id", 'ID', new IntField(), false, false, "input"),
        new TableField("name", 'Имя', new StrField(), false, false, "input"),
        new TableField("status", 'Статус', new StrField(), false, false, "input"),
        new TableField("track", "Отслеживать", new BoolField(), false, true, "switch"),
    ])
    .setTabs([{title:"Direct",url:"index.directCampaigs"},{title:"Adwords",url:"index.adwordsCampaigs",selected:true}]);
