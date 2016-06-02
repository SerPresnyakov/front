import {CrudTableConfig} from "../../../src/models/CrudTableConfig";
import {StrField} from "../../../src/fieldTypes/StrField";
import {TableField} from "../../../src/models/TableField";
import {IntField} from "../../../src/fieldTypes/IntField";
import {ObjField} from "../../../src/fieldTypes/ObjField";
import {TableRel} from "../../../src/models/TableRel";

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