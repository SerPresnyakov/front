import {CrudTableConfig} from "../../../../modules/crudTableModule/src/CrudTableConfig";
import {StrField} from "../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../../../modules/crudTableModule/src/fieldTypes/IntField";
import {TableRel} from "../../../../modules/crudTableModule/src/TableRel";
import {ObjField} from "../../../../modules/crudTableModule/src/fieldTypes/ObjField";
import {TableField} from "../../../../modules/crudTableModule/src/TableField";

export const table: CrudTableConfig = new CrudTableConfig("Магазины", "/left/pricelab/shop")
    .setFields([
        new TableField("name", 'Название', new StrField(), false,"input"),
        new TableField("clientId", 'Клиент', new IntField(), false, "autocomplete"),
        new TableField("offersFeed", 'Офферы магазина', new ObjField(), false, "object"),
        new TableField("encoding", 'Кодировка', new StrField(), false, "select", "offersFeed",[{prop:"utf-8"},{prop:"windows-1251"}]),
        new TableField("url", 'URL на xml файл с офферами', new StrField(), false, "input", "offersFeed"),
        new TableField("reportExport", 'Экспорт отчета', new ObjField(), false, "object"),
        new TableField("password", 'Пароль', new StrField(), false, "input", "reportExport"),
        new TableField("url", 'URL', new StrField(), false, "input", "reportExport")
    ])
    .setRels([
       new TableRel("clientId", "client", "/left/client", "one", false)
    ]);