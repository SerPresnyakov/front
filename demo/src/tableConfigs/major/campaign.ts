import {CrudTableConfig} from "../../../../modules/crudTableModule/src/CrudTableConfig";
import {StrField} from "../../../../modules/crudTableModule/src/fieldTypes/StrField";
import {IntField} from "../../../../modules/crudTableModule/src/fieldTypes/IntField";
import {TableRel} from "../../../../modules/crudTableModule/src/TableRel";
import {ObjField} from "../../../../modules/crudTableModule/src/fieldTypes/ObjField";
import {TableField} from "../../../../modules/crudTableModule/src/TableField";
import {BoolField} from "../../../../modules/crudTableModule/src/fieldTypes/BoolField";

export const table: CrudTableConfig = new CrudTableConfig("Кампании", "/api/direct/campaign")
    .setFields([
        new TableField("name", 'Имя', new StrField(), false,"input"),
        new TableField("status", 'Статус', new StrField(), false,"input"),
        new TableField("id", 'ID', new IntField(), false, "input"),
        new TableField("isActive", "Активна", new BoolField(), true, "switch"),
        new TableField("statusShow", "Медиаплан", new BoolField(), true, "switch"),
        new TableField("track", "Отслеживать", new BoolField(), true, "switch"),
    ]);
