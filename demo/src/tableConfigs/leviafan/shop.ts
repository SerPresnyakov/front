import {StrField} from "../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../../../modules/crudTableModule/src/fieldTypes/IntField";
import {ObjField} from "../../../../modules/crudTableModule/src/fieldTypes/ObjField";
import {TableField} from "../../../../modules/crudTableModule/src/models/TableField";
import {TableRel} from "../../../../modules/crudTableModule/src/models/TableRel";
import {CrudTableConfig} from "../../../../modules/crudTableModule/src/crudTable/CrudTableConfig";

export const table = new CrudTableConfig("Магазины", "/api/crud", "pricelabs.shops")
    .setFields([
        new TableField("name", 'Название', new StrField(), false, false, "input"),
        new TableField("clientId", 'Клиент', new IntField(), false, false, "autocomplete"),
        new TableField("offersFeed", 'Офферы магазина', new ObjField(), false, false, "object"),
        new TableField("encoding", 'Кодировка', new StrField(), false, false,"select", "offersFeed",[{prop:"utf-8"},{prop:"windows-1251"}]),
        new TableField("url", 'URL на xml файл с офферами', new StrField(), false, false, "input", "offersFeed"),
        new TableField("reportExport", 'Экспорт отчета', new ObjField(), false, false, "object"),
        new TableField("password", 'Пароль', new StrField(), false, false, "input", "reportExport"),
        new TableField("url", 'URL', new StrField(), false, false, "input", "reportExport")
    ])
    .setRels([
       new TableRel("clientId", "client", "/left/client", "one", false)
    ]);